import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VlcContextService} from '../../service.vlc-context/vlc-context.service';
import {CompositePlaylistNode, ICompositePlaylistNode, LeafPlaylistNode, Playlist, PlaylistNode} from '../../model/vlc';
import {Router} from '@angular/router';
import {RouteManifest} from '../../RouteManifest';




@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Output() playlistPlay = new EventEmitter<LeafPlaylistNode>();

  playlist: Playlist = null;
  playlistNodes: PlaylistNode[] = null;


  initialising = true;



  async asyncOnInit() {

    this.playlist = await this.vlc.getPlaylist( );
    this.playlistNodes = this.playlist.root.children as PlaylistNode[];
    console.log( 'this.playlistNodes', this.playlistNodes );

    this.initialising = false;
  }


  async onClick(playlistNode: LeafPlaylistNode) {

    // console.log( 'onClick', 'playlistNode', playlistNode );

    await this.vlc.pl_play( playlistNode );
    this.playlist.current = playlistNode;
    RouteManifest.PLAYBACK_CONTROL.navigate( this.router );


    this.playlistPlay.emit( playlistNode );
  }

  ngOnInit() {

    this.asyncOnInit();
  }

  constructor(
    private vlc: VlcContextService,
    private router: Router
  ) {
  }

}
