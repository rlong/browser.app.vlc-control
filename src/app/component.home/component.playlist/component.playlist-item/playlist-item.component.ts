import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaylistNode} from '../../../model/vlc';


@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {


  @Input() playlistNode: PlaylistNode = null;
  @Input() current: PlaylistNode = null;

  matIcon() {

    if( this.current === this.playlistNode ) {

      return 'play_arrow';
    }
    return 'movie';
  }

  ngOnInit() {
  }

  constructor() { }

}
