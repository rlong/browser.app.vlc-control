import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VlcService } from "../../app/VLC"
import {PlaylistPage} from "../playlist/playlist";
import {HelpPage} from "../help/help";

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
  }

  helpOpen() {

    this.navCtrl.push( HelpPage );
  }

  async ngOnInit() {

    let status = await this.proxy.status();
    console.log( [this], "ngOnInit", status );
    // this.navCtrl.push(PlaylistPage);
  }

}
