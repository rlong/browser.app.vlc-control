import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioLibraryComponent} from './component.audio-library/audio-library.component';


const routes: Routes = [

  {
    path: '',
    component:  AudioLibraryComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
