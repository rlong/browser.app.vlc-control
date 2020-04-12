import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistRoutingModule } from './playlist-routing.module';
import {PlaylistComponent} from './component.playlist/playlist.component';
import {PlaylistItemComponent} from './component.playlist/component.playlist-item/playlist-item.component';
import {HomeRoutingModule} from '../module.home/home-routing.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {
  MatButtonModule, MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRippleModule, MatSliderModule,
  MatTabsModule
} from '@angular/material';


@NgModule({
  declarations: [
    PlaylistComponent,
    PlaylistItemComponent,
  ],
  imports: [

    // core ...
    CommonModule,

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
    PlaylistRoutingModule,
    WidgetsModule,

  ]
})
export class PlaylistModule { }
