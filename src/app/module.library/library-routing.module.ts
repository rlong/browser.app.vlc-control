import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioLibraryComponent} from './component.audio-library/audio-library.component';
import {GenresListingComponent} from './component.genres-listing/genres-listing.component';
import {GenresAlbumsListingComponent} from './component.genres-albums-listing/genres-albums-listing.component';
import {TracksListingComponent} from './component.tracks-listing/tracks-listing.component';


const routes: Routes = [

  {
    path: '',
    component:  AudioLibraryComponent,
    children: [
    ]
  },
  {
    path: 'genres',
    component:  GenresListingComponent,
  },
  {
    path: 'genres/:genreIndex',
    component:  GenresAlbumsListingComponent,
  },
  {
    path: 'genres/:genreIndex/tracks',
    component:  TracksListingComponent,
  },
  {
    path: 'genres/:genreIndex/albums/:albumIndex',
    component:  TracksListingComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
