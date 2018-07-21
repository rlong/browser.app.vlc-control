import { Injectable } from '@angular/core';
import {Node, Playlist, Status, VlcProxy} from "../../model/vlc";
import {Http} from "@angular/http";


export class StatusReference {

  isPending: boolean = false;
  private _promise: Promise<Status>;


  constructor( public value: Status = null ) {

    if( value ) {

      this._promise = Promise.resolve( value );
    }
  }

  public get promise() {
    return this._promise;
  }


  public set promise(promise: Promise<Status>) {

    this._promise = promise;

    this.isPending = true;

    this._promise.then( (value: Status) => {

      this.value = value;
      this.isPending = false;
    }).catch( () => {

      this.isPending = false;
    });
  }

}

export class PlaylistReference {

  isPending: boolean = false;
  public _promise: Promise<Playlist>;


  constructor( public value: Playlist = null ) {

    if( value ) {

      this.promise = Promise.resolve( value );
    }
  }

  public get promise() {
    return this._promise;
  }

  public set promise(promise: Promise<Playlist>) {

    this._promise = promise;

    this.isPending = true;

    this._promise.then( (value: Playlist) => {

      this.value = value;
      this.isPending = false;
    }).catch( () => {

      this.isPending = false;
    });
  }

}

/*
*/
@Injectable()
export class VlcProvider {


  public status: StatusReference = new StatusReference();
  public playlist: PlaylistReference = new PlaylistReference();

  proxy: VlcProxy;


  constructor(private http:Http ) {

    this.proxy = new VlcProxy( http );
  }


  async getPlaylist(forceRefresh: boolean = false): Promise<Playlist> {

    if( !forceRefresh && this.playlist.promise ) {

      return this.playlist.promise;
    }

    this.playlist.promise = this.proxy.playlist();
    return this.playlist.promise;
  }


  async getStatus( forceRefresh: boolean = false ): Promise<Status> {

    if( !forceRefresh && this.status.promise ) {

      return this.status.promise;
    }

    this.status.promise = this.proxy.status();
    return this.status.promise;

  }


  async playPause(): Promise<Status> {

    this.status.promise = this.proxy.playPause();
    return this.status.promise;

  }

  async playlistNext(): Promise<Status> {

    this.status.promise = this.proxy.playlistNext();
    return this.status.promise;
  }

  async playlistPlay( node: Node): Promise<Status> {

    this.status.promise = this.proxy.playlistPlay( node );
    return this.status.promise;
  }

  async playlistPrevious(): Promise<Status> {

    this.status.promise = this.proxy.playlistPrevious();
    return this.status.promise;
  }

  async toggleFullScreen(): Promise<Status> {

    this.status.promise = this.proxy.toggleFullScreen();
    return this.status.promise;
  }


}
