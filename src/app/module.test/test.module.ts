import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TabsOverviewExampleComponent } from './component.tabs-overview-example/tabs-overview-example.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    TabsOverviewExampleComponent
  ],
  imports: [
    CommonModule,

    // material ...
    MatTabsModule,

    TestRoutingModule
  ]
})
export class TestModule { }
