import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TabsOverviewExampleComponent} from './component.tabs-overview-example/tabs-overview-example.component';
import {PageStylingsComponent} from './page-stylings/page-stylings.component';
import {FullPageComponent} from './full-page/full-page.component';


const routes: Routes = [


  {
    path: '',
    component:  TabsOverviewExampleComponent,
  },
  {
    path: 'stylings',
    component:  PageStylingsComponent,
  },
  {
    path: 'full-page',
    component:  FullPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
