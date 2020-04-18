import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresAlbumsListingComponent } from './genres-albums-listing.component';

describe('GenresAlbumsListingComponent', () => {
  let component: GenresAlbumsListingComponent;
  let fixture: ComponentFixture<GenresAlbumsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresAlbumsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresAlbumsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
