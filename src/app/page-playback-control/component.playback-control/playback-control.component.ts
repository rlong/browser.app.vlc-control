import { Component, OnInit } from '@angular/core';
import {VlcService} from '../../service.vlc/vlc.service';

@Component({
  selector: 'app-playback-control',
  templateUrl: './playback-control.component.html',
  styleUrls: ['./playback-control.component.scss']
})
export class PlaybackControlComponent implements OnInit {


  onPlayPause() {

    console.log( 'onPlayPause' );
    this.vlc.playPause();

  }

  ngOnInit() {
  }

  constructor( private vlc: VlcService ) { }

}
