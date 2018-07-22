import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {HomePage} from "../pages/home/home";
import {ControlPage} from "../pages/control/control";
import {ConnectPage} from "../pages/connect/connect";
import {PlaylistPage} from "../pages/playlist/playlist";
import {BrowseFolderPage} from "../pages/browse-folder/browse-folder";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  // rootPage:any = HomePage;
  rootPage:any = ConnectPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
