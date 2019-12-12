import { Component, OnInit } from '@angular/core';
import {VlcService} from '../service.vlc/vlc.service';

@Component({
  selector: 'app-page-playback-control',
  templateUrl: './page-playback-control.component.html',
  styleUrls: ['./page-playback-control.component.scss']
})
export class PagePlaybackControlComponent implements OnInit {


  ngOnInit() {
  }

  constructor( private vlc: VlcService ) { }

}
