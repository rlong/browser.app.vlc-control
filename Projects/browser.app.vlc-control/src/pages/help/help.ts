import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HelpSetupVlcOnOsxPage} from "../help-setup-vlc-on-osx/help-setup-vlc-on-osx";
import {HelpSetupVlcOnWindowsPage} from "../help-setup-vlc-on-windows/help-setup-vlc-on-windows";

/**
 * Generated class for the HelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  helpSetupVlcOnOsx() {

    this.navCtrl.push( "HelpSetupVlcOnOsxPage" );
  }

  helpSetupVlcOnWindows() {

    this.navCtrl.push( "HelpSetupVlcOnWindowsPage" );
  }
}
