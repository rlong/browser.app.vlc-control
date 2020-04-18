import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksListingComponent } from './tracks-listing.component';

describe('TracksListingComponent', () => {
  let component: TracksListingComponent;
  let fixture: ComponentFixture<TracksListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
