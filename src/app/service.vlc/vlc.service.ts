import { Injectable } from '@angular/core';
import {FileNode, Playlist, PlaylistNode, Status, VlcProxy} from '../model/vlc';
import Timer = NodeJS.Timer;
import * as Http from 'http';
import {ConfigurationService} from '../service.configuration/configuration.service';



export class StatusReference {

  isPending = false;

  private _promise: Promise<Status>;


  constructor( public value: Status = null ) {

    if ( value ) {

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

  isPending = false;
  public _promise: Promise<Playlist>;


  constructor( public value: Playlist = null ) {

    if ( value ) {

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


  timer: Timer = null;

  constructor( public vlc: VlcService ) {
  }

  start() {

    if ( null != this.timer ) {
      console.warn( [this], 'start', this.timer );
      return;
    }

    this.timer = setInterval( () => {

      if ( !this.vlc.status.isPending ) {

        this.vlc.getStatus(true);
      }
    }, 1000);

  }

  stop() {

    if ( null == this.timer ) {
      console.warn( [this], 'stop', this.timer );
      return;
    }

    clearInterval( this.timer );
    this.timer = null;
  }

}


@Injectable({
  providedIn: 'root'
})
export class VlcService {


  public status: StatusReference;
  public playlist: PlaylistReference;
  private statusPoller: StatusPoller;

  proxy: VlcProxy;



  init( config: ConfigurationService ) {

    // clean-up
    if ( this.statusPoller ) {

      this.statusPoller.stop();
    }

    const host: string = config.getHost( '' );
    this.proxy = new VlcProxy( this.http, host );

    this.playlist = new PlaylistReference();
    this.status = new StatusReference();
    this.statusPoller = new StatusPoller( this );
  }

  async browse( dir: string, excludeDotDot: boolean = true ): Promise<FileNode[]> {


    const answer: FileNode[] = await this.proxy.browse( dir );
    if ( answer.length > 0 && excludeDotDot ) {
      if ( answer[0].value.name === '..' ) {
        answer.shift();
      }
    }
    return answer;
  }

  async getPlaylist(forceRefresh: boolean = false): Promise<Playlist> {

    if ( !forceRefresh && this.playlist.promise ) {

      return this.playlist.promise;
    }

    this.playlist.promise = this.proxy.playlist();
    return this.playlist.promise;
  }


  async getStatus( forceRefresh: boolean = false ): Promise<Status> {

    if ( !forceRefresh && this.status.promise ) {

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


  async pl_empty(): Promise<Status> {

    this.status.promise = this.proxy.pl_empty();
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

    let val = this.status.value.value.time - delta;

    if ( 0 > val )  {
      val = 0;
    }

    return this.proxy.seek( val );
  }

  async skipForward(delta: number) {

    let val = this.status.value.value.time + delta;

    if ( this.status.value.value.length <= val )  {
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

  constructor(private http: Http, config: ConfigurationService ) {

    this.init( config );
  }
}
