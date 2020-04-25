import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsListingComponent } from './artists-listing.component';

describe('ArtistsListingComponent', () => {
  let component: ArtistsListingComponent;
  let fixture: ComponentFixture<ArtistsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
