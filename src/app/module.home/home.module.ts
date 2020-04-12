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
import {WidgetsModule} from '../widgets/widgets.module';


@NgModule({

  declarations: [

    PageHomeComponent,
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
