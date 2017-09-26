import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { PlaylistPage } from "../playlist/playlist"
import { VlcService } from "../../app/VLC"
import {PlaylistPage} from "../playlist/playlist";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private proxy:VlcService) {
  }


  playlistOpen() {

    console.log( [this], "playlistOpen" );
    PlaylistPage.pushOnTo( this.navCtrl );
    // this.navCtrl.push( 'PlaylistPage' );
  }


  async ngOnInit() {

    let status = await this.proxy.status();
    console.log( [this], "ngOnInit", status );
    // this.navCtrl.push(PlaylistPage);
  }

}
