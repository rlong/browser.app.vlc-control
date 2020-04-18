import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InitialisingComponent} from './component.initialising/initialising.component';



@NgModule({
  declarations: [
    InitialisingComponent
  ],
  exports: [
    InitialisingComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class WidgetsModule { }
