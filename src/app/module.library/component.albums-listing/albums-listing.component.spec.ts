import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsListingComponent } from './genres-albums-listing.component';

describe('GenresAlbumsListingComponent', () => {
  let component: AlbumsListingComponent;
  let fixture: ComponentFixture<AlbumsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
