import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ENodeType,Node} from "../../model/vlc";
import {PlaylistReference, StatusReference, VlcProvider} from "../../providers/vlc/vlc";
import {ControlPage} from "../control/control";

/**
 */
@IonicPage()
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


  async nodeSelected( node: Node ) {

    console.log( [this], "nodeSelected", ENodeType.leaf );

    if( node.type === ENodeType.leaf ) {

      this.vlc.playlistPlay( node );
      ControlPage.pushOnTo( this.navCtrl );
    } else {

      console.log( [this], "nodeSelected", node );
    }
  }

  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push("PlaylistPage");
  }

}
