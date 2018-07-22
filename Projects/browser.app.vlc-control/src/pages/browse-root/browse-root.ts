import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BrowseFolderPage} from "../browse-folder/browse-folder";
import {VlcProvider} from "../../providers/vlc/vlc";

/**
 * Generated class for the BrowseRootPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-browse-root',
  templateUrl: 'browse-root.html',
})
export class BrowseRootPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public vlc: VlcProvider,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseRootPage');
  }


  browseHome() {

    BrowseFolderPage.pushOnTo( this.navCtrl );
  }

  public static pushOnTo( navCtrl: NavController ) {

    navCtrl.push(BrowseRootPage);
  }


}
