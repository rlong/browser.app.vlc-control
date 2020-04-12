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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({

  declarations: [
    PageHomeComponent,
  ],

  imports: [

    // core ...
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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
