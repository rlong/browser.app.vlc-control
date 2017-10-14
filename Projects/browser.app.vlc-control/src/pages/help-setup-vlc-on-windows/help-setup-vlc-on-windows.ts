import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpSetupVlcOnWindowsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help-setup-vlc-on-windows',
  templateUrl: 'help-setup-vlc-on-windows.html',
})
export class HelpSetupVlcOnWindowsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpSetupVlcOnWindowsPage');
  }

}
