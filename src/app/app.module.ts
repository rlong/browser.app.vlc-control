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
import { PageConnectComponent } from './component.connect/page-connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageStylingsComponent } from './page-stylings/page-stylings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PlaylistComponent } from './module.home/component.playlist/playlist.component';
import { PlaylistItemComponent} from './module.home/component.playlist/component.playlist-item/playlist-item.component';
import {WidgetsModule} from './widgets/widgets.module';




@NgModule({
  declarations: [
    AppComponent,
    PageConnectComponent,
    PageNotFoundComponent,
    PageStylingsComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
