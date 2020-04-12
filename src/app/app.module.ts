import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRippleModule,
  MatTabsModule
} from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {WidgetsModule} from './widgets/widgets.module';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [

    // core ...
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // 3rd party ...

    // material ...
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatTabsModule,

    // in-house ...
    AppRoutingModule,
    WidgetsModule,

  ],
  providers: [
    // vvv [Angular material slider not sliding - Stack Overflow](https://stackoverflow.com/questions/54347597/angular-material-slider-not-sliding/54347846)
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
    // ^^^ [Angular material slider not sliding - Stack Overflow](https://stackoverflow.com/questions/54347597/angular-material-slider-not-sliding/54347846)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
