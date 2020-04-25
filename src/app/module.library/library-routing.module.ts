import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioLibraryComponent} from './component.audio-library/audio-library.component';
import {GenresListingComponent} from './component.genres-listing/genres-listing.component';
import {TracksListingComponent} from './component.tracks-listing/tracks-listing.component';
import {AlbumsListingComponent} from './component.albums-listing/albums-listing.component';
import {ArtistsListingComponent} from './component.artists-listing/artists-listing.component';


const routes: Routes = [

  {
    path: '',
    component:  AudioLibraryComponent,
    children: [
    ]
  },
  {
    path: 'albums',
    component:  AlbumsListingComponent,
  },
  {
    path: 'albums/:albumIndex/tracks',
    component:  TracksListingComponent,
  },
  {
    path: 'artists',
    component:  ArtistsListingComponent,
  },
  {
    path: 'artists/:artistIndex/albums',
    component:  AlbumsListingComponent,
  },
  {
    path: 'genres',
    component:  GenresListingComponent,
  },
  {
    path: 'genres/:genreIndex/albums',
    component:  AlbumsListingComponent,
  },
  {
    path: 'genres/:genreIndex/tracks',
    component:  TracksListingComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
