import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatRippleModule} from '@angular/material';
import { PageConnectComponent } from './page-connect/page-connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { PageTestComponent } from './page-test/page-test.component';
import {PageTestRoute} from './page-test/PageTestRoute';
import {PageConnectRoute} from './page-connect/PageConnectRoute';


const routes: Routes = [

  { path: PageConnectRoute.PATH, component: PageConnectComponent }, // /#/
  { path: PageTestRoute.PATH, component: PageTestComponent }, // /#/test
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    PageConnectComponent,
    PageNotFoundComponent,
    PageTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),

    // material ...
    MatButtonModule,
    MatRippleModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
