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
import { GenresListingComponent } from './component.genres-listing/genres-listing.component';
import { GenresAlbumsListingComponent } from './component.genres-albums-listing/genres-albums-listing.component';
import { TracksListingComponent } from './component.tracks-listing/tracks-listing.component';
import {WidgetsModule} from '../module.widgets/widgets.module';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AudioLibraryComponent,
    GenresListingComponent,
    GenresAlbumsListingComponent,
    TracksListingComponent,
  ],
  imports: [

    // core ...
    CommonModule,

    // material ...
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatToolbarModule,

    // in-house ...
    LibraryRoutingModule,
    WidgetsModule
  ]
})
export class LibraryModule { }
