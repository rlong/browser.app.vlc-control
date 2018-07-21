import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlaylistReference, StatusReference, VlcProvider} from "../../providers/vlc/vlc";

/**
 * Generated class for the ControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage implements OnInit{

  public status: StatusReference;
  public playlist: PlaylistReference;

  constructor(public navCtrl: NavController,
              public vlc: VlcProvider,
              public navParams: NavParams) {

    this.status = vlc.status;
    this.playlist = vlc.playlist;
  }



  ionViewDidLoad() {

  }


  ngOnInit(): void {

    this.vlc.getStatus();
  }


  playPause() {

    this.vlc.playPause();
  }

  toggleFullScreen() {

    this.vlc.toggleFullScreen();
  }

  playlistNext() {

    this.vlc.playlistNext();
  }

  playlistPrevious() {

    this.vlc.playlistPrevious();
  }


  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push("ControlPage" );
  }


}
