import {Component, Input, OnInit} from '@angular/core';
import {IPlaybackControl, StatusReference} from '../../../model/VlcPlayback';
import {del} from 'selenium-webdriver/http';
import {__await} from 'tslib';

@Component({
  selector: 'app-playback-control',
  templateUrl: './playback-control.component.html',
  styleUrls: ['./playback-control.component.scss']
})
export class PlaybackControlComponent implements OnInit {


  @Input() playbackControl: IPlaybackControl = null;
  @Input() status: StatusReference = null;

  mutedVolume: number = null;

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


  async onChangeVolume( delta: number ) {


    console.log( 'this.status.volumePercentage', this.status.volumePercentage  );
    console.log( 'this.status.value.volume', this.status.value.volume,  );
    const volumePercentage = this.status.volumePercentage + delta;
    await this.playbackControl.setVolumeAsPercentage( volumePercentage );
    console.log( 'this.status.volumePercentage', this.status.volumePercentage );
    console.log( 'this.status.value.volume', this.status.value.volume  );
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


  ngOnInit() {
  }

  constructor() {
  }

}
