import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouteManifest} from './RouteManifest';




const routes: Routes = [


  { path: '',
    loadChildren: () => import('./module.home/home.module').then(m => m.HomeModule )
  },

  { // audio-library
    path: RouteManifest.AUDIO_LIBRARY.path,
    loadChildren: () => import('./module.library/library.module').then(m => m.LibraryModule )
  },
  {
    path: 'files',
    loadChildren: () => import('./module.files/files.module').then(m => m.FilesModule )
  },
  { // playback-control
    path: RouteManifest.PLAYBACK_CONTROL.path,
    loadChildren: () => import('./module.playback-control/playback-control.module').then(m => m.PlaybackControlModule )
  },
  {
    path: 'playlist',
    loadChildren: () => import('./module.playlist/playlist.module').then(m => m.PlaylistModule )
  },
  {
    path: 'test',
    loadChildren: () => import('./module.test/test.module').then(m => m.TestModule )
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
