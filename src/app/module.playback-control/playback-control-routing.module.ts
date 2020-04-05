import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagePlaybackControlComponent} from './component.playback-control/page-playback-control.component';
import {PageTestComponent} from './page-test/page-test.component';


const routes: Routes = [

  {
    path: '',
    component:  PagePlaybackControlComponent,
  },
  {
    path: 'test',
    component:  PageTestComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaybackControlRoutingModule { }
