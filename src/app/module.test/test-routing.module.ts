import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TabsOverviewExampleComponent} from './component.tabs-overview-example/tabs-overview-example.component';


const routes: Routes = [


  { path: '', component:  TabsOverviewExampleComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
