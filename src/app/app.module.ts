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
import {PageConnectRoute} from './component.connect/PageConnectRoute';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { PageTestComponent } from './page-test/page-test.component';
import {PageTestRoute} from './page-test/PageTestRoute';
import { PageStylingsComponent } from './page-stylings/page-stylings.component';
import {PageStylingsRoute} from './page-stylings/PageStylingsRoute';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PagePlaybackControlComponent } from './component.home/component.playback-control/page-playback-control.component';
import {PagePlaybackControlRoute} from './component.home/component.playback-control/PagePlaybackControlRoute';
import {PlaybackControlComponent} from './component.home/component.playback-control/component.playback-control/playback-control.component';
import { MediaComponent } from './component.home/component.media/media.component';
import { PlaylistComponent } from './component.home/component.playlist/playlist.component';
import {PageHomeComponent} from './component.home/home.component';
import {RouteDescriptors} from './RouteDescriptors';
import { InitialisingComponent } from './component.initialising/initialising.component';
import { PlaylistItemComponent} from './component.home/component.playlist/component.playlist-item/playlist-item.component';

const routes: Routes = [

  { path: PageConnectRoute.PATH, component: PageConnectComponent }, // /#/
  { path: RouteDescriptors.home.path, component: PageHomeComponent }, // /#/home
  { path: PagePlaybackControlRoute.PATH, component: PagePlaybackControlComponent }, // /#/playback-control
  { path: PageStylingsRoute.PATH, component: PageStylingsComponent }, // /#/stylings
  { path: PageTestRoute.PATH, component: PageTestComponent }, // /#/test
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    PageConnectComponent,
    PageNotFoundComponent,
    PageTestComponent,
    PageStylingsComponent,
    PagePlaybackControlComponent,
    PlaybackControlComponent,
    PageHomeComponent,
    MediaComponent,
    PlaylistComponent,
    InitialisingComponent,
    PlaylistItemComponent
  ],
  imports: [

    // core ...
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),

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


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
