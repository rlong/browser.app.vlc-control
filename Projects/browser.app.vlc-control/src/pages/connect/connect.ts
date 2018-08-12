import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlaylistReference, StatusReference, VlcProvider} from "../../providers/vlc/vlc";
import {ControlPage} from "../control/control";
import {PlaylistPage} from "../playlist/playlist";
import {BrowseRootPage} from "../browse-root/browse-root";
import {ConfigurationProvider} from "../../providers/configuration/configuration";
import {MusicLibraryProvider} from "../../providers/music-library/music-library";

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



  private _host = null;
  private connected: boolean = false;



  set host(value: string) {

    this._host = value;
    this.config.setHost( value );
  }

  get host() {

    return this._host;
  }


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vlc: VlcProvider,
              private config: ConfigurationProvider,
              private musicLibrary: MusicLibraryProvider) {
  }

  ngOnInit(): void {

    this._host = this.config.getHost( "");
    this.vlc.init( this.config );
    this.tryConnect();
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

  async tryConnect() {

    try {

      this.connected = false;

      this.vlc.init( this.config );
      const status = await this.vlc.getStatus();
      console.log( [this], "tryConnect", status );

      this.connected = true;

    } catch (e) {

      console.error( [this], "tryConnect", e  );
    }

  }
}
