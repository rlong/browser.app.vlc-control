import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {VlcService} from "./VLC"
import { HttpModule } from '@angular/http';
import {PlaylistPageModule} from "../pages/playlist/playlist.module";
import {HelpSetupVlcOnOsxPage} from "../pages/help-setup-vlc-on-osx/help-setup-vlc-on-osx";
import {HelpPage} from "../pages/help/help";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HelpPage,
    HelpSetupVlcOnOsxPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    PlaylistPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HelpPage,
    HelpSetupVlcOnOsxPage,
  ],
  providers: [
    VlcService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
