import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {PageHomeComponent} from './home.component';
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRippleModule,
  MatTabsModule
} from '@angular/material';
import {MediaComponent} from './component.media/media.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {PagePlaybackControlComponent} from './component.playback-control/page-playback-control.component';
import {PlaybackControlComponent} from './component.playback-control/component.playback-control/playback-control.component';
import {PageTestComponent} from './page-test/page-test.component';
import {PlaylistComponent} from './component.playlist/playlist.component';
import {PlaylistItemComponent} from './component.playlist/component.playlist-item/playlist-item.component';


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
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatTabsModule,

    // in-house ...
    HomeRoutingModule,
    WidgetsModule,

  ]
})
export class HomeModule { }
