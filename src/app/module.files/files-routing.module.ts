import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FolderContentsComponent} from './component.folder-contents/folder-contents.component';


const routes: Routes = [
  {
    path: '',
    component:  FolderContentsComponent,
    // children: [
    //   { path: ':dir', component: MediaComponent },
    // ]
  },
  {
    path: ':dir',
    component:  FolderContentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
