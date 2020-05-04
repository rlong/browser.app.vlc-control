import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InitialisingComponent} from './component.initialising/initialising.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



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

    // material ...
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,

    CommonModule,
  ]
})
export class WidgetsModule { }
