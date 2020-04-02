import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IPlaybackControl, StatusReference} from '../../../model/VlcPlayback';

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


    // console.log( 'this.status.volumePercentage', this.status.volumePercentage  );
    // console.log( 'this.status.value.volume', this.status.value.volume,  );
    const volumePercentage = this.status.volumePercentage + delta;
    await this.playbackControl.setVolumeAsPercentage( volumePercentage );
    // console.log( 'this.status.volumePercentage', this.status.volumePercentage );
    // console.log( 'this.status.value.volume', this.status.value.volume  );
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


  async onSeek(val: number ) {

    this.playbackControl.seek( val );

  }


  ngOnInit() {
  }

  constructor() {
  }

}
