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


  static MEDIA_NAV_LINK = {
    label: 'Media',
    link: './media',
    index: 0
  };

  static PLAYLIST_NAV_LINK = {
    label: 'Playlist',
    link: './playlist',
    index: 1
  };

  initialising = true;
  selectedIndex = 0;


  activeLinkIndex = -1;


  navLinks = [
    PageHomeComponent.MEDIA_NAV_LINK,
    PageHomeComponent.PLAYLIST_NAV_LINK,
  ];

  onUrlChange( url: string ) {

    if( url.endsWith( 'playback')) {

      if( !this.vlc.isPollingStatus() ) {

        this.vlc.startPollingStatus();
      }
    } else {

      if( this.vlc.isPollingStatus() ) {

        this.vlc.stopPollingStatus();
      }
    }
  }


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
    this.onUrlChange( this.router.url );

    this.router.events.subscribe((res) => {

      this.onUrlChange( this.router.url );

      // this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
      // console.log( 'this.activeLinkIndex', this.activeLinkIndex );
      // console.log( 'this.router.url', this.router.url );
    });

  }



  constructor( private config: ConfigurationService,
               private vlc: VlcService,
               private router: Router ) {

    const host = this.config.getHost( 'localhost:4200');
    this.vlc.init( host );
  }

}
