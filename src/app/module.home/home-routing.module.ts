import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageHomeComponent} from './home.component';
import {MediaComponent} from './component.media/media.component';
import {PagePlaybackControlComponent} from './component.playback-control/page-playback-control.component';
import {PlaylistComponent} from './component.playlist/playlist.component';


const routes: Routes = [


  { path: '', component:  PageHomeComponent,
    children: [
      { path: 'media', component: MediaComponent },
      { path: 'playback', component: PagePlaybackControlComponent },
      { path: 'playlist', component: PlaylistComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
