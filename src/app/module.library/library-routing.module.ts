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
      // {
      //   path: 'albums',
      //   component:  AudioLibraryComponent,
      // },
      // {
      //   path: 'albums/:albumIndex',
      //   component:  AudioLibraryComponent,
      // },
      // {
      //   path: 'artists',
      //   component:  AudioLibraryComponent,
      // },
      // {
      //   path: 'artists/:artistIndex',
      //   component:  AudioLibraryComponent,
      // },
      // {
      //   path: 'artists/:artistIndex/albums/:albumIndex',
      //   component:  AudioLibraryComponent,
      // },
      // {
      //   path: 'genres/:genreIndex/albums/:albumIndex',
      //   component:  AudioLibraryComponent,
      // }
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
    path: 'genres/:genreIndex/albums/:albumIndex',
    component:  TracksListingComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
