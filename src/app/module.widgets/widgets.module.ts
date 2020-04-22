import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InitialisingComponent} from './component.initialising/initialising.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    InitialisingComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    InitialisingComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [

    MatToolbarModule,

    CommonModule,
  ]
})
export class WidgetsModule { }
