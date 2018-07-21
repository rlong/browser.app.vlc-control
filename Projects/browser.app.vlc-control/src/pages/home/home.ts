import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlaylistReference, StatusReference, VlcProvider} from "../../providers/vlc/vlc";
import {PlaylistPage} from "../playlist/playlist";
import {ControlPage} from "../control/control";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public status: StatusReference;
  public playlist: PlaylistReference;


  constructor(public navCtrl: NavController,
              public vlc: VlcProvider) {

    this.status = vlc.status;
    this.playlist = vlc.playlist;
  }

  ngOnInit(): void {

    this.vlc.getStatus();
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
