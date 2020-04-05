import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IPlaybackControl, StatusReference} from '../../../model/VlcPlayback';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatSliderChange} from '@angular/material/slider';

@Component({
  selector: 'app-playback-control',
  templateUrl: './playback-control.component.html',
  styleUrls: ['./playback-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaybackControlComponent implements OnInit {


  @Input() playbackControl: IPlaybackControl = null;
  @Input() status: StatusReference = null;

  mutedVolume: number = null;


  volumeInput: Subject<MatSliderChange> = new Subject<MatSliderChange>();
  progressInput: Subject<MatSliderChange> = new Subject<MatSliderChange>();


  onPlayPause() {

    console.log( 'onPlayPause' );
    this.playbackControl.playPause();
  }

  get isPaused() {

    if( !this.status ) {
      return false;
    }
    return this.status.isPaused;
  }


  get fullscreen() {

    if( !this.status ) {
      return false;
    }

    return this.status.value.fullscreen;
  }

  get isPlaying() {

    if( !this.status ) {
      return false;
    }
    return this.status.isPlaying;
  }


  async onVolumeChange(delta: number ) {

    const volumePercentage = this.status.volumePercentage + delta;
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

      this.mutedVolume = this.status.volumePercentage;
      this.playbackControl.setVolumeAsPercentage( 0 );
    } else {

      this.playbackControl.setVolumeAsPercentage( this.mutedVolume );
      this.mutedVolume = null;
    }

  }


  async onSeekRelative(val: number ) {

    this.playbackControl.seekRelative( val );
  }


  ngOnInit() {

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

  }

  constructor() {
  }

}
