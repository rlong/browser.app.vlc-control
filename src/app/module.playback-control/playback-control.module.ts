import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaybackControlRoutingModule } from './playback-control-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {PlaybackControlComponent} from './component.playback-control/playback-control.component';
import {PageTestComponent} from './page-test/page-test.component';
import {LibraryRoutingModule} from '../module.library/library-routing.module';
import {WidgetsModule} from '../module.widgets/widgets.module';


@NgModule({
  declarations: [
    PlaybackControlComponent,
    PageTestComponent,
  ],
  imports: [

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
    PlaybackControlRoutingModule,
    WidgetsModule
  ]
})
export class PlaybackControlModule { }
