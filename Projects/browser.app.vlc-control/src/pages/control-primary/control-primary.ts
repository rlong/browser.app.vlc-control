import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VlcService} from "../../app/VLC";

/**
 * Generated class for the ControlPrimaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control-primary',
  templateUrl: 'control-primary.html',
})
export class ControlPrimaryPage {


  private static readonly NAME = "ControlPrimaryPage";


  constructor(public navCtrl: NavController, public navParams: NavParams, private vlcService:VlcService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPrimaryPage');
  }

  playPause() {

    this.vlcService.playPause();
  }

  toggleFullScreen() {

    this.vlcService.toggleFullScreen();
  }

  playlistNext() {

    this.vlcService.playlistNext();
  }

  playlistPrevious() {

    this.vlcService.playlistPrevious();
  }


  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push(ControlPrimaryPage.NAME);
  }
}
