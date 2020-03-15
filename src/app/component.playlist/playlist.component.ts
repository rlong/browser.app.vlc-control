import { Component, OnInit } from '@angular/core';
import {VlcService} from '../service.vlc/vlc.service';
import {CompositePlaylistNode, ICompositePlaylistNode, Playlist, PlaylistNode} from '../model/vlc';



interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {


  playlist: Playlist = null;
  playlistNodes: PlaylistNode[] = null;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }

  ];

  initialising = true;

  async asyncOnInit() {

    this.playlist = await this.vlc.getPlaylist( );
    this.playlistNodes = this.playlist.root.children as PlaylistNode[];
    console.log( 'this.playlistNodes', this.playlistNodes );

    this.initialising = false;
  }


  ngOnInit() {

    this.asyncOnInit();
  }

  constructor(
    private vlc: VlcService
  ) {
  }

}
