import {Component, Input, OnInit} from '@angular/core';
import {IPlaybackControl, StatusReference} from '../../model/VlcPlayback';

@Component({
  selector: 'app-playback-control',
  templateUrl: './playback-control.component.html',
  styleUrls: ['./playback-control.component.scss']
})
export class PlaybackControlComponent implements OnInit {


  @Input() playbackControl: IPlaybackControl = null;
  @Input() status: StatusReference = null;

  onPlayPause() {

    console.log( 'onPlayPause' );
    this.playbackControl.playPause();
  }

  ngOnInit() {
  }

  constructor() {
  }

}
