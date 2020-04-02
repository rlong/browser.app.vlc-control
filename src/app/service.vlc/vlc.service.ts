import {Injectable} from '@angular/core';
import {FileNode, Playlist, PlaylistNode, Status, VlcProxy} from '../model/vlc';
import {HttpClient} from '@angular/common/http';
import {IPlaybackControl, StatusReference} from '../model/VlcPlayback';


// export class StatusReference {
//
//   isPending = false;
//
//   private _promise: Promise<Status>;
//
//
//   constructor( public value: Status = null ) {
//
//     if ( value ) {
//
//       this._promise = Promise.resolve( value );
//     }
//   }
//
//   public get promise() {
//     return this._promise;
//   }
//
//
//   public set promise(promise: Promise<Status>) {
//
//     this._promise = promise;
//
//     this.isPending = true;
//
//     this._promise.then( (value: Status) => {
//
//       this.value = value;
//       this.isPending = false;
//     }).catch( () => {
//
//       this.isPending = false;
//     });
//   }
//
//
// }


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


  timer = null;


  start() {

    if ( null != this.timer ) {
      console.warn( [this], 'start', this.timer );
      return;
    }

    // immediately ...
    if( !this.vlc.inflightStatusRequest ) {

      this.vlc.getStatus(true);
    }

    // every second thereafter ...
    this.timer = setInterval( () => {

      if( !this.vlc.inflightStatusRequest ) {

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

  constructor( public vlc: VlcService ) {
  }

}


@Injectable({
  providedIn: 'root'
})
export class VlcService implements IPlaybackControl {


  public status: StatusReference|null;
  public inflightStatusRequest: Promise<StatusReference> = null;
  public playlist: PlaylistReference|null;
  private statusPoller: StatusPoller;

  public proxy: VlcProxy|null;


  init( host: string ) {

    // clean-up
    if ( this.statusPoller ) {

      this.statusPoller.stop();
    }

    this.proxy = new VlcProxy( this.http, host );

    this.playlist = new PlaylistReference();
    // this.status = new StatusReference();
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


  private async handleStatusPromise( promise: Promise<StatusReference> ) {

    this.inflightStatusRequest = promise;
    try {

      this.status = await promise;
    } finally {

      this.inflightStatusRequest = null;
    }
  }


  async getStatus( forceRefresh: boolean = false ): Promise<StatusReference> {

    const answer = this.proxy.status();
    this.handleStatusPromise( answer );
    return answer;
  }


  async in_play(input: string ): Promise<StatusReference>  {
    const answer = this.proxy.in_play( input );
    this.handleStatusPromise( answer );
    return answer;
  }


  async playPause(): Promise<StatusReference> {

    const answer = this.proxy.pl_pause();
    this.handleStatusPromise( answer );
    return answer;
  }


  async pl_empty(): Promise<StatusReference> {

    const answer = this.proxy.pl_empty();
    this.handleStatusPromise( answer );
    return answer;
  }

  async playlistNext(): Promise<StatusReference> {

    const answer = this.proxy.pl_next();
    this.handleStatusPromise( answer );
    return answer;
  }

  async pl_play(node: PlaylistNode): Promise<StatusReference> {

    const answer = this.proxy.pl_play( node );
    this.handleStatusPromise( answer );
    return answer;
  }

  async playlistPrevious(): Promise<StatusReference> {

    const answer = this.proxy.pl_previous();
    this.handleStatusPromise( answer );
    return answer;
  }



  async seek(delta: number): Promise<StatusReference> {

    let val = this.status.value.time + delta;

    if ( 0 > val )  { // not beyound the start

      val = 0;
    } else if ( this.status.value.length <= val )  { // not beyound the end

      val = this.status.value.length - 1;
    }

    return this.proxy.seek( val );
  }

  async toggleFullScreen(): Promise<StatusReference> {

    const answer = this.proxy.toggleFullScreen();
    this.handleStatusPromise( answer );
    return answer;
  }


  isPollingStatus(): boolean {
    if( this.statusPoller.timer ) {

      return true;
    }
    return false;
  }

  startPollingStatus() {

    this.statusPoller.start();
  }

  stopPollingStatus() {

    this.statusPoller.stop();
  }

  setVolumeAsPercentage( volumeAsPercentage: number ): Promise<StatusReference> {

    const val = Math.round(volumeAsPercentage * 3.2 );
    const answer = this.proxy.setVolume( val );
    this.handleStatusPromise( answer );
    return answer;
  }

  constructor(private http: HttpClient ) {}

}
