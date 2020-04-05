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
import {PageTestComponent} from '../module.playback-control/page-test/page-test.component';
import {PlaylistComponent} from './component.playlist/playlist.component';
import {PlaylistItemComponent} from './component.playlist/component.playlist-item/playlist-item.component';


@NgModule({

  declarations: [

    PageHomeComponent,
    MediaComponent,
    PlaylistComponent,
    PlaylistItemComponent,
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
})
export class HomeModule { }
