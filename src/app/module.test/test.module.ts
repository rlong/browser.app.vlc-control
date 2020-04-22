import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TabsOverviewExampleComponent } from './component.tabs-overview-example/tabs-overview-example.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PageStylingsComponent} from './page-stylings/page-stylings.component';
import {FullPageComponent} from './full-page/full-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [
    PageStylingsComponent,
    TabsOverviewExampleComponent,
    FullPageComponent,

  ],
  imports: [
    CommonModule,

    // material ...
    MatListModule,
    MatRippleModule,
    MatTabsModule,
    MatToolbarModule,


    TestRoutingModule
  ]
})
export class TestModule { }
