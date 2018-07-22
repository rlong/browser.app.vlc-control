import { Injectable } from '@angular/core';
import {PlaylistNode, Playlist, Status, VlcProxy, FileNode} from "../../model/vlc";
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


class StatusPoller {


  timerId: number = -1;

  constructor( public vlc: VlcProvider ) {
  }

  start() {


    if( -1 != this.timerId ) {
      console.warn( [this],"start", this.timerId );
      return;
    }

    this.timerId = setInterval( () => {

      if( !this.vlc.status.isPending ) {

        this.vlc.getStatus(true);
      }
    }, 1000);

  }

  stop() {

    if( -1 == this.timerId ) {
      console.warn( [this],"stop", this.timerId );
      return;
    }

    clearInterval( this.timerId );
    this.timerId = -1;
  }

}

/*
*/
@Injectable()
export class VlcProvider {


  public status: StatusReference = new StatusReference();
  public playlist: PlaylistReference = new PlaylistReference();
  private statusPoller: StatusPoller;

  proxy: VlcProxy;


  constructor(private http:Http ) {

    this.proxy = new VlcProxy( http );
    this.statusPoller = new StatusPoller( this );
  }

  async browse( dir: string, excludeDotDot: boolean = true ): Promise<FileNode[]> {


    let answer: FileNode[] = await this.proxy.browse( dir );
    if( answer.length > 0 && excludeDotDot ) {
      if( answer[0].value.name = ".." ) {
        answer.shift();
      }
    }
    return answer;
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


  async in_play(input: string ): Promise<Status>  {
    this.status.promise = this.proxy.in_play( input );
    return this.status.promise;
  }


  async playPause(): Promise<Status> {

    this.status.promise = this.proxy.pl_pause();
    return this.status.promise;
  }

  async pl_next(): Promise<Status> {

    this.status.promise = this.proxy.pl_next();
    return this.status.promise;
  }

  async pl_play(node: PlaylistNode): Promise<Status> {

    this.status.promise = this.proxy.pl_play( node );
    return this.status.promise;
  }

  async pl_previous(): Promise<Status> {

    this.status.promise = this.proxy.pl_previous();
    return this.status.promise;
  }


  async skipBackward(delta: number) {

    var val = this.status.value.value.time - delta;
    if( 0 > val )  {
      val = 0;
    }

    return this.proxy.seek( val );
  }

  async skipForward(delta: number) {

    var val = this.status.value.value.time + delta;

    if( this.status.value.value.length <= val )  {
      val = this.status.value.value.length - 1;
    }

    return this.proxy.seek( val );
  }

  async toggleFullScreen(): Promise<Status> {

    this.status.promise = this.proxy.toggleFullScreen();
    return this.status.promise;
  }


  startPollingStatus() {

    this.statusPoller.start();
  }

  stopPollingStatus() {

    this.statusPoller.stop();
  }

}
