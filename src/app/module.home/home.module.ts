import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {PageHomeComponent} from './home.component';
import {
  MatButtonModule, MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRippleModule, MatSliderModule,
  MatTabsModule
} from '@angular/material';
import {MediaComponent} from './component.media/media.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {PagePlaybackControlComponent} from './component.playback-control/page-playback-control.component';
import {PlaybackControlComponent} from './component.playback-control/component.playback-control/playback-control.component';
import {PageTestComponent} from './page-test/page-test.component';
import {PlaylistComponent} from './component.playlist/playlist.component';
import {PlaylistItemComponent} from './component.playlist/component.playlist-item/playlist-item.component';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({

  declarations: [

    PageHomeComponent,
    MediaComponent,
    PlaybackControlComponent,
    PagePlaybackControlComponent,
    PlaylistComponent,
    PlaylistItemComponent,
    PageTestComponent,
  ],

  imports: [

    // core ...
    CommonModule,

    // 3rd party ...

    // material ...
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSliderModule,
    MatTabsModule,

    // in-house ...
    HomeRoutingModule,
    WidgetsModule,

  ],
  // // // vvv [Angular material slider not sliding - Stack Overflow](https://stackoverflow.com/questions/54347597/angular-material-slider-not-sliding/54347846)
  // providers: [
  //   {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  // ]
  // // // ^^^ [Angular material slider not sliding - Stack Overflow](https://stackoverflow.com/questions/54347597/angular-material-slider-not-sliding/54347846)
})
export class HomeModule { }
