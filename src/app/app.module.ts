import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatRippleModule} from '@angular/material';
import { PageConnectComponent } from './page-connect/page-connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { PageTestComponent } from './page-test/page-test.component';
import {PageTestRoute} from './page-test/PageTestRoute';
import {PageConnectRoute} from './page-connect/PageConnectRoute';
import { PageStylingsComponent } from './page-stylings/page-stylings.component';
import {PageStylingsRoute} from './page-stylings/PageStylingsRoute';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


const routes: Routes = [

  { path: PageConnectRoute.PATH, component: PageConnectComponent }, // /#/
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
    PageStylingsComponent
  ],
  imports: [

    // base ...
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),

    // material ...
    MatButtonModule,
    MatInputModule,
    MatRippleModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
