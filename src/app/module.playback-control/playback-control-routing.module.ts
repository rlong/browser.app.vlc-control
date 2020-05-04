import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageTestComponent} from './page-test/page-test.component';
import {PlaybackControlComponent} from './component.playback-control/playback-control.component';


const routes: Routes = [

  {
    path: '',
    component:  PlaybackControlComponent,
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
