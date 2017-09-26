import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CompositeNode, ENodeType, INode, Node, Playlist, VlcService} from "../../app/VLC"
import {ControlPrimaryPage} from "../control-primary/control-primary";

/**
 * Generated class for the PlaylistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage implements OnInit {


  private static readonly NAME = "PlaylistPage";

  private playlist: Playlist;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vlcService:VlcService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }

  async ngOnInit() {

    this.playlist = await this.vlcService.playlist();
    console.log( [this], "ngOnInit", this.playlist );
  }


  async nodeSelected( node: Node ) {

    console.log( [this], "nodeSelected", ENodeType.leaf );

    if( node.type === ENodeType.leaf ) {

      this.vlcService.playlistPlay( node );
      ControlPrimaryPage.pushOnTo( this.navCtrl );
    } else {

      console.log( [this], "nodeSelected", node );
    }
  }


  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push(PlaylistPage.NAME);
  }
}
