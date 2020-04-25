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
import { TracksListingComponent } from './component.tracks-listing/tracks-listing.component';
import {WidgetsModule} from '../module.widgets/widgets.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AlbumsListingComponent} from './component.albums-listing/albums-listing.component';
import { ArtistsListingComponent} from './component.artists-listing/artists-listing.component';


@NgModule({
  declarations: [
    AlbumsListingComponent,
    AudioLibraryComponent,
    GenresListingComponent,
    TracksListingComponent,
    ArtistsListingComponent,
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
