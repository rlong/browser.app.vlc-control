import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOverviewExampleComponent } from './tabs-overview-example.component';

describe('TabsOverviewExampleComponent', () => {
  let component: TabsOverviewExampleComponent;
  let fixture: ComponentFixture<TabsOverviewExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsOverviewExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsOverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
