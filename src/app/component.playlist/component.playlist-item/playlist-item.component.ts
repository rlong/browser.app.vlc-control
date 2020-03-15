import {Component, Input, OnInit} from '@angular/core';
import {PlaylistNode} from '../../model/vlc';


@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {


  @Input() playlistNode: PlaylistNode = null;
  @Input() current: PlaylistNode = null;


  ngOnInit() {
  }

  constructor() { }

}
