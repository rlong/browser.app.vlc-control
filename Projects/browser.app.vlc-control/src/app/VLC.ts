

import {Http, Headers, RequestOptionsArgs} from "@angular/http"
import 'rxjs/Rx';
import {Injectable} from "@angular/core";


export enum ENodeType {
  leaf,
  node
}


export interface IVideoEffects {
  gamma: number;
  contrast: number;
  saturation: number;
  brightness: number;
  hue: number;
}
export interface IAudioFilters {
}

export interface ICategory {

  meta: ICategoryMeta;
}

export interface ICategoryMeta {

  artist: string;
  filename: string;
  "Download URL": string;
  "Album URL": string;
  title: string;
  url: string;
  artwork_url: string;
}

export interface IInformation {

  category: ICategory;
  chapter: number;
  chapters: any[];
  title: number;
  titles: any[];

}

export interface IStatus {

  apiversion: number;
  audiodelay: number;
  audiofilters: IAudioFilters;
  currentplid: number;
  equalizer: any[]
  fullscreen: number;
  information? : IInformation;
  length: number;
  loop: boolean;
  position: number;
  random: number;
  rate: number;
  repeat: boolean;
  state: string;
  subtitledelay: number;
  time: number;
  videoeffects: IVideoEffects;
  version: string;
  volume: number;

}


export class Status {
  value: IStatus;

  constructor( value: IStatus ) {
    this.value = value;
  }
}



export interface INode {

  id: string;
  name: string;
  ro: string;
  type: string;
}

export class Node {

  public type: ENodeType = ENodeType.node;

  constructor( public value: INode ) {
  }

}

export interface ICompositeNode extends INode {

  children: INode[];
}


export class CompositeNode extends Node {

  children: Node[];

  constructor( public typedValue: ICompositeNode, currentNodeReference: ICurrentNodeReference ) {

    super(typedValue);

    this.children = typedValue.children.map( (e) => {

      if( CompositeNode.isComposite( e ) ) {
        return new CompositeNode( e as ICompositeNode, currentNodeReference );
      }

      let answer = new LeafNode( e as ILeafNode );

      if( answer.isCurrent() ) {

        currentNodeReference.current = answer;
      }
      return answer;
    });
  }

  static isComposite( candidate: INode ) {

    if( "node" === candidate.type ) {

      return true;
    }
    return false;
  }

}

export interface ILeafNode extends INode {

  duration: number;
  uri: string;
  current?: string;
}

export class LeafNode extends Node {


  _isCurrent: boolean|null = null;

  constructor( public typedValue: ILeafNode )
  {
    super(typedValue);

    this.type = ENodeType.leaf;
  }

  isCurrent() {

    if( null == this._isCurrent ) {

      if( "current" === this.typedValue.current ) {

        this._isCurrent = true;
      } else {

        this._isCurrent = false;
      }
    }

    return this._isCurrent;
  }


}


export interface IPlaylist extends ICompositeNode {

}

export interface ICurrentNodeReference {

  current: LeafNode;
}

export class Playlist implements ICurrentNodeReference {

  root: CompositeNode;
  current: LeafNode;

  constructor( public value: IPlaylist ) {
    this.current = null;
    this.root = new CompositeNode( this.value.children[0] as ICompositeNode, this );
  }

}


export class VlcProxy {

  // private baseUrl = "http://127.0.0.1:8080";
  private baseUrl = "";
  private requestOptionsArgs: RequestOptionsArgs;

  constructor(private http:Http) {

    // VLC is hosting this site
    if( "8080" == window.location.port ) {

      this.baseUrl = "/assets"
    }
    console.log( [this], "constructor", this.baseUrl);

    let headers =  new Headers();


    let username = "";
    let password = "vlcremote";
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));

    this.requestOptionsArgs = {
      headers: headers
    }
  }

  async status(): Promise<Status> {

    let url = this.baseUrl + "/requests/status.json";
    let response = await this.http.get( url, this.requestOptionsArgs ).first().toPromise() ;
    return new Status( response.json() );
  }

  async playlist(): Promise<Playlist> {

    let url = this.baseUrl + "/requests/playlist.json";
    let response = await this.http.get( url, this.requestOptionsArgs ).first().toPromise() ;
    return new Playlist( response.json() );
  }

  async playPause(): Promise<Status> {

    let url = this.baseUrl + "/requests/status.json?command=pl_pause";
    return this.dispatchStatusRequest( url );
  }


  async playlistNext() {

    let url = `${this.baseUrl}/requests/status.json?command=pl_next`;
    return this.dispatchStatusRequest( url );
  }


  async playlistPlay(node: Node): Promise<Status> {

    let url = `${this.baseUrl}/requests/status.json?command=pl_play&id=${node.value.id}`;
    return this.dispatchStatusRequest( url );
  }

  async playlistPrevious(): Promise<Status> {

    let url = `${this.baseUrl}/requests/status.json?command=pl_previous`;
    return this.dispatchStatusRequest( url );
  }


  async toggleFullScreen(): Promise<Status> {

    let url = `${this.baseUrl}/requests/status.json?command=fullscreen`;
    return this.dispatchStatusRequest( url );
  }

  private async dispatchStatusRequest( url: string ): Promise<Status> {

    let response = await this.http.get( url, this.requestOptionsArgs ).first().toPromise() ;
    return new Status( response.json() );
  }


}



@Injectable()
export class VlcService {

  proxy: VlcProxy;


  constructor(private http:Http) {
    this.proxy = new VlcProxy( this.http );
  }


  async status(): Promise<Status> {
    return this.proxy.status();
  }

  async playlist(): Promise<Playlist> {
    return this.proxy.playlist();
  }

  async playPause(): Promise<Status> {
    return this.proxy.playPause();
  }

  async playlistNext(): Promise<Status> {
    return this.proxy.playlistNext();
  }

  async playlistPlay( node: Node): Promise<Status> {
    return this.proxy.playlistPlay( node );
  }

  async playlistPrevious(): Promise<Status> {
    return this.proxy.playlistPrevious();
  }

  async toggleFullScreen(): Promise<Status> {
    return this.proxy.toggleFullScreen();
  }

}
