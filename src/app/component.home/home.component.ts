import { Component, OnInit } from '@angular/core';
import {VlcService} from '../service.vlc/vlc.service';
import {ConfigurationService} from '../service.configuration/configuration.service';
import {LeafPlaylistNode} from '../model/vlc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PageHomeComponent implements OnInit {


  initialising = true;
  selectedIndex = 0;

  async asyncOnInit() {


    console.log( 'this.vlc', this.vlc );

    await this.vlc.getPlaylist( );
    this.initialising = false;
  }


  onPlaylistPlay( playlistNode: LeafPlaylistNode ) {

    console.log( 'playlistNode', playlistNode );
    this.selectedIndex = 1;
  }

  ngOnInit() {

    this.asyncOnInit();
  }

  constructor( private config: ConfigurationService,
               private vlc: VlcService ) {

    const host = this.config.getHost( 'localhost:4200');
    this.vlc.init( host );
  }

}
