

import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Http, Headers, RequestOptionsArgs} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/first';



export enum EPlaylistNodeType {
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


export interface IBrowseResponse {

  element: IFileNode[];
}

export interface ICategory {

  meta: ICategoryMeta;
}

export interface ICategoryMeta {

  album?: string;
  artist?: string;
  artwork_url?: string;
  date?: string;
  description?: string;
  encoded_by?: string;
  filename?: string;
  genre?: string;
  title?: string;
  track_number?: string;
  track_total?: string;
}


export class CategoryMeta {

  date: number;
  track_number: number;
  track_total: number;

  constructor( public value: ICategoryMeta ) {

    this.date =  CategoryMeta.getNumber( value.date );
    this.track_number =  CategoryMeta.getNumber( value.track_number );
    this.track_total = CategoryMeta.getNumber( value.track_total );
  }

  private static getNumber( value: any ): number | null {

    if ( 'number' === typeof value ) {
      return value;
    }

    if ( 'string' === typeof value ) {

      if ( 0 === value.length ) {
        return null;
      }

      const answer = parseInt( value, 10 );
      if ( isNaN( answer )) {

        console.error( 'CategoryMeta', 'getNumber', 'isNaN( answer )', value );
        return null;
      }

      return answer;
    }

    // unhanlded type ...
    return null;
  }


}


export interface IFileNode {

  type: string;
  path: string;
  name: string;
  access_time: number;
  uid: number;
  creation_time: number;
  gid: number;
  modification_time: number;
  mode: number;
  uri: string;
  size: number;
}


export class FileNode {

  isDirectory = false;
  isFile = false;

  constructor( public value: IFileNode ) {

    if ( 'dir' === value.type ) {

      this.isDirectory = true;
    } else if ( 'file' === value.type ) {

      this.isFile = true;
    } else {

      console.error( [this], 'constructor', value.type );
    }
  }
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
  equalizer: any[];
  fullscreen: boolean;
  information?: IInformation;
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

  public stateIsPlaying = false;
  public stateIsPaused = false;
  public volumePercentage: number;


  private init() {

    if ( this.value.state === 'playing') {

      this.stateIsPlaying = true;
    } else if ( this.value.state === 'paused') {

      this.stateIsPaused = true;
    }

    this.volumePercentage = Math.round( 100 * (this.value.volume / 320));

  }

  constructor( value: IStatus ) {
    this.value = value;
    this.init();
  }

}




export interface IPlaylistNode {

  id: string;
  name: string;
  ro: string;
  type: string;
}

export class PlaylistNode {

  public type: EPlaylistNodeType = EPlaylistNodeType.node;

  constructor( public value: IPlaylistNode ) {
  }

}


export interface ICompositePlaylistNode extends IPlaylistNode {

  children: IPlaylistNode[];
}


export class CompositePlaylistNode extends PlaylistNode {

  children: PlaylistNode[];

  constructor(public typedValue: ICompositePlaylistNode, currentNodeReference: ICurrentPlaylistNode ) {

    super(typedValue);

    this.children = typedValue.children.map( (e) => {

      if ( CompositePlaylistNode.isComposite( e ) ) {

        return new CompositePlaylistNode( e as ICompositePlaylistNode, currentNodeReference );
      }

      const answer = new LeafPlaylistNode( e as ILeafPlaylistNode );

      if ( answer.isCurrent() ) {

        currentNodeReference.current = answer;
      }
      return answer;
    });
  }

  static isComposite( candidate: IPlaylistNode ) {

    if( 'node' === candidate.type ) {

      return true;
    }
    return false;
  }

}



export interface ILeafPlaylistNode extends IPlaylistNode {

  duration: number;
  uri: string;
  current?: string;
}

export class LeafPlaylistNode extends PlaylistNode {


  _isCurrent: boolean|null = null;

  constructor( public typedValue: ILeafPlaylistNode ) {
    super(typedValue);

    this.type = EPlaylistNodeType.leaf;
  }

  isCurrent() {

    if ( null == this._isCurrent ) {

      if ( 'current' === this.typedValue.current ) {

        this._isCurrent = true;
      } else {

        this._isCurrent = false;
      }
    }

    return this._isCurrent;
  }


}



export interface IPlaylist extends ICompositePlaylistNode {

}

export interface ICurrentPlaylistNode {

  current: LeafPlaylistNode;
}

export class Playlist implements ICurrentPlaylistNode {

  root: CompositePlaylistNode;
  current: LeafPlaylistNode;

  constructor( public value: IPlaylist ) {
    this.current = null;
    this.root = new CompositePlaylistNode( this.value.children[0] as ICompositePlaylistNode, this );
  }

}



export class VlcProxy {

  // private baseUrl = "http://127.0.0.1:8080";
  private baseUrl = '';
  private requestOptionsArgs;

  constructor(private http: HttpClient, host = '') {


    if ( 0 !== host.length ) {

      this.baseUrl = `http://${host}`;
    } else if ( '8080' === window.location.port ) { // VLC is hosting this site

      this.baseUrl += '/assets';
    }


    console.log( [this], 'constructor', `this.baseUrl: ${this.baseUrl}`);

    const username = '';
    const password = 'vlccontrol';

    const headers =  new HttpHeaders( {

      Authorization: 'Basic ' + btoa(username + ':' + password)
    });


    this.requestOptionsArgs = {
      headers
    };
  }


  async browse(dir: string): Promise<FileNode[]> {

    const encodedDir = encodeURIComponent( dir );
    const url = `${this.baseUrl}/requests/browse.json?dir=${encodedDir}`;
    const response = await this.http.get( url, this.requestOptionsArgs ).toPromise() as any;
    const fileNodes: IBrowseResponse = response;

    return fileNodes.element.map( (e) => new FileNode( e ));
  }

  async in_play(input: string ): Promise<Status> {

    const encodedInput = encodeURI( input); // encodeURIComponent( input );

    const url = `${this.baseUrl}/requests/status.json?command=in_play&input=${encodedInput}`;
    return this.dispatchStatusRequest( url );
  }

  async status(): Promise<Status> {

    const url = this.baseUrl + '/requests/status.json';
    return this.dispatchStatusRequest( url );
  }

  async playlist(): Promise<Playlist> {

    const url = this.baseUrl + '/requests/playlist.json';
    const response = await this.http.get( url, this.requestOptionsArgs ).toPromise() as any;
    return new Playlist( response );
  }


  async pl_empty(): Promise<Status> {

    const url = this.baseUrl + '/requests/status.json?command=pl_empty';
    return this.dispatchStatusRequest( url );
  }

  async pl_pause(): Promise<Status> {

    const url = this.baseUrl + '/requests/status.json?command=pl_pause';
    return this.dispatchStatusRequest( url );
  }

  async pl_next() {

    const url = `${this.baseUrl}/requests/status.json?command=pl_next`;
    return this.dispatchStatusRequest( url );
  }


  async pl_play(node: PlaylistNode): Promise<Status> {

    const url = `${this.baseUrl}/requests/status.json?command=pl_play&id=${node.value.id}`;
    return this.dispatchStatusRequest( url );
  }

  async pl_previous(): Promise<Status> {

    const url = `${this.baseUrl}/requests/status.json?command=pl_previous`;
    return this.dispatchStatusRequest( url );
  }


  async seek( val: number ): Promise<Status> {

    if ( 0 > val  ) {

      console.warn( [this], 'seek', '0 > val', val );
      val = 0;
    }


    const url = `${this.baseUrl}/requests/status.json?command=seek&val=${val}`;
    return this.dispatchStatusRequest( url );
  }


  async setVolume(val: number): Promise<Status> {

    if ( 0 > val  ) {

      console.warn( [this], 'setVolume', '0 > val', val );
      val = 0;
    } else if ( 320 < val ) {

      console.warn( [this], 'setVolume', '320 < val', val );
      val = 320;
    }

    const url = `${this.baseUrl}/requests/status.json?command=volume&val=${val}`;
    return this.dispatchStatusRequest( url );
  }

  async toggleFullScreen(): Promise<Status> {

    const url = `${this.baseUrl}/requests/status.json?command=fullscreen`;
    return this.dispatchStatusRequest( url );
  }

  private async dispatchStatusRequest( url: string ): Promise<Status> {


    console.log( [this], 'constructor', `this.requestOptionsArgs`, this.requestOptionsArgs);

    const response = await this.http.get( url, this.requestOptionsArgs ).toPromise() as any;
    return new Status( response );
  }


}



