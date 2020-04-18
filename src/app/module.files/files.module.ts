import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import {WidgetsModule} from '../module.widgets/widgets.module';
import {
  MatButtonModule, MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRippleModule, MatSliderModule,
  MatTabsModule
} from '@angular/material';
import {FolderContentsComponent} from './component.folder-contents/folder-contents.component';


@NgModule({
  declarations: [
    FolderContentsComponent
  ],
  imports: [

    // core ...
    CommonModule,

    // 3rd party ...

    // material ...
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSliderModule,
    MatTabsModule,

    // in-house ...
    FilesRoutingModule,
    WidgetsModule,
  ]
})
export class FilesModule { }
