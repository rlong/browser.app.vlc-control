import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EPlaylistNodeType,PlaylistNode} from "../../model/vlc";
import {PlaylistReference, StatusReference, VlcProvider} from "../../providers/vlc/vlc";
import {ControlPage} from "../control/control";

/**
 */

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage implements OnInit{


  public status: StatusReference;
  public playlist: PlaylistReference;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vlc: VlcProvider) {

    this.status = vlc.status;
    this.playlist = vlc.playlist;
  }

  ionViewDidLoad() {

    // console.log('ionViewDidLoad PlaylistPage');
  }

  ngOnInit(): void {

    console.log( [this], 'ngOnInit');

    this.vlc.getPlaylist();

  }


  async nodeSelected( node: PlaylistNode ) {

    console.log( [this], "nodeSelected", EPlaylistNodeType.leaf );

    if( node.type === EPlaylistNodeType.leaf ) {

      this.vlc.pl_play( node );
      ControlPage.pushOnTo( this.navCtrl );
    } else {

      console.log( [this], "nodeSelected", node );
    }
  }

  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push(PlaylistPage);
  }

}
