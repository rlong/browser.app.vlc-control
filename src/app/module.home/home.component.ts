import { Component, OnInit } from '@angular/core';
import {VlcService} from '../service.vlc/vlc.service';
import {ConfigurationService} from '../service.configuration/configuration.service';
import {LeafPlaylistNode} from '../model/vlc';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PageHomeComponent implements OnInit {


  initialising = true;
  selectedIndex = 0;


  navLinks = [
    {
      label: 'Media',
      link: './media',
      index: 0
    }, {
      label: 'Playback',
      link: './playback',
      index: 1
    }, {
      label: 'Playlist',
      link: './playlist',
      index: 2
    },
  ];

  activeLinkIndex = -1;


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

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

  }




  constructor( private config: ConfigurationService,
               private vlc: VlcService,
               private router: Router ) {

    const host = this.config.getHost( 'localhost:4200');
    this.vlc.init( host );
  }

}
