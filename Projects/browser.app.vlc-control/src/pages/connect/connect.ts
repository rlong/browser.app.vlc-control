import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlaylistReference, StatusReference, VlcProvider} from "../../providers/vlc/vlc";
import {ControlPage} from "../control/control";
import {PlaylistPage} from "../playlist/playlist";
import {BrowseRootPage} from "../browse-root/browse-root";

/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage implements OnInit {

  public status: StatusReference;
  public playlist: PlaylistReference;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vlc: VlcProvider) {

    this.status = vlc.status;
    this.playlist = vlc.playlist;
  }

  ngOnInit(): void {

    this.vlc.getStatus();
  }

  browseOpen() {

    console.log( [this], "browseOpen" );
    BrowseRootPage.pushOnTo( this.navCtrl );

  }
  controlOpen() {

    console.log( [this], "controlOpen" );
    ControlPage.pushOnTo( this.navCtrl );
  }

  playlistOpen() {

    console.log( [this], "playlistOpen" );
    PlaylistPage.pushOnTo( this.navCtrl );
  }

  helpOpen() {

    console.log( [this], "helpOpen" );
    this.navCtrl.push( "HelpPage" );
  }

}
