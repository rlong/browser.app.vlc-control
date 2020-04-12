import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioLibraryComponent} from './component.audio-library/audio-library.component';


const routes: Routes = [

  {
    path: '',
    component:  AudioLibraryComponent,
    children: [
      {
        path: 'albums',
        component:  AudioLibraryComponent,
      },
      {
        path: 'albums/:albumIndex',
        component:  AudioLibraryComponent,
      },
      {
        path: 'artists',
        component:  AudioLibraryComponent,
      },
      {
        path: 'artists/:artistIndex',
        component:  AudioLibraryComponent,
      },
      {
        path: 'artists/:artistIndex/albums/:albumIndex',
        component:  AudioLibraryComponent,
      },
      {
        path: 'genres',
        component:  AudioLibraryComponent,
      },
      {
        path: 'genres/:genreIndex',
        component:  AudioLibraryComponent,
      },
      {
        path: 'genres/:genreIndex/albums/:albumIndex',
        component:  AudioLibraryComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
