import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { VlcProvider } from '../providers/vlc/vlc';
import { HttpModule } from '@angular/http';
import {ControlPage} from "../pages/control/control";
import {ConnectPage} from "../pages/connect/connect";
import {BrowseFolderPage} from "../pages/browse-folder/browse-folder";
import {BrowseRootPage} from "../pages/browse-root/browse-root";
import {PlaylistPage} from "../pages/playlist/playlist";
import { ConfigurationProvider } from '../providers/configuration/configuration';
import { MusicLibraryProvider } from '../providers/music-library/music-library';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    BrowseFolderPage,
    BrowseRootPage,
    ConnectPage,
    ControlPage,
    HomePage,
    PlaylistPage,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),

    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSliderModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    BrowseFolderPage,
    BrowseRootPage,
    ConnectPage,
    ControlPage,
    HomePage,
    PlaylistPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VlcProvider,
    ConfigurationProvider,
    MusicLibraryProvider
  ]
})
export class AppModule {}
