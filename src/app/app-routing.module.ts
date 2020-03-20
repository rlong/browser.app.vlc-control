import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageConnectRoute} from './component.connect/PageConnectRoute';
import {PageConnectComponent} from './component.connect/page-connect.component';
import {PageStylingsRoute} from './page-stylings/PageStylingsRoute';
import {PageStylingsComponent} from './page-stylings/page-stylings.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [

  { path: PageConnectRoute.PATH, component: PageConnectComponent}, // /#/

  { path: 'home',
    loadChildren: () => import('./module.home/home.module').then(m => m.HomeModule )
  },

  { path: PageStylingsRoute.PATH, component: PageStylingsComponent }, // /#/stylings
  { path: '**', component: PageNotFoundComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
