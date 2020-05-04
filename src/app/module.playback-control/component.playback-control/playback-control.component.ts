import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {IPlaybackControl, StatusReference} from '../../model/VlcPlayback';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatSliderChange} from '@angular/material/slider';
import {VlcContextService} from '../../service.vlc-context/vlc-context.service';
import {SessionContextService} from '../../service.session-context/session-context.service';

@Component({
  selector: 'app-playback-control',
  templateUrl: './playback-control.component.html',
  styleUrls: ['./playback-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaybackControlComponent implements OnInit, OnDestroy {


  @Input() playbackControl: IPlaybackControl = null;

  mutedVolume: number = null;

  volumeInput: Subject<MatSliderChange> = new Subject<MatSliderChange>();
  progressInput: Subject<MatSliderChange> = new Subject<MatSliderChange>();


  onPlayPause() {

    console.log( 'onPlayPause' );
    this.playbackControl.playPause();
  }


  get isPaused() {

    if( !this.vlc.status ) {
      return false;
    }
    return this.vlc.status.isPaused;
  }


  get fullscreen() {

    if( !this.vlc.status ) {
      return false;
    }

    return this.vlc.status.value.fullscreen;
  }

  get isPlaying() {

    if( !this.vlc.status ) {
      return false;
    }
    return this.vlc.status.isPlaying;
  }


  async onVolumeChange(delta: number ) {

    const volumePercentage = this.vlc.status.volumePercentage + delta;
    await this.playbackControl.setVolumeAsPercentage( volumePercentage );
  }

  async onVolumeInput(change: MatSliderChange) {

    this.volumeInput.next( change );
  }

  async onProgressInput(change: MatSliderChange) {

    this.progressInput.next( change );
  }

  async onToggleMute() {

    if( null === this.mutedVolume ) {

      this.mutedVolume = this.vlc.status.volumePercentage;
      this.playbackControl.setVolumeAsPercentage( 0 );
    } else {

      this.playbackControl.setVolumeAsPercentage( this.mutedVolume );
      this.mutedVolume = null;
    }

  }


  async onSeekRelative(val: number ) {

    this.playbackControl.seekRelative( val );
  }


  async init() {

    this.playbackControl = this.vlc;

    this.volumeInput
        .pipe(debounceTime(100), distinctUntilChanged())
        .subscribe(next => {
          console.log( 'next', next );
          this.playbackControl.setVolumeAsPercentage( next.value );
        });

    this.progressInput
        .pipe(debounceTime(100), distinctUntilChanged())
        .subscribe(next => {
          console.log( 'next', next );
          this.playbackControl.seekAbsolute( next.value );
        });

    if( this.vlc.initialising ) {

      await this.vlc.initialising;
    }
    this.vlc.startPollingStatus();

  }

  ngOnInit() {

    this.init();

  }

  ngOnDestroy(): void {

    console.log( [this], 'ngOnDestroy' );
    this.vlc.stopPollingStatus();
  }


  constructor(private vlc: VlcContextService,
              private sessionContext: SessionContextService ) {
  }

}
