import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { AudioLibraryComponent } from './component.audio-library/audio-library.component';
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRippleModule,
  MatTabsModule
} from '@angular/material';


@NgModule({
  declarations: [
    AudioLibraryComponent
  ],
  imports: [

    // core ...
    CommonModule,

    // material ...
    MatButtonModule,
    MatRippleModule,

    // in-house ...
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
