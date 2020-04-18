import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresListingComponent } from './genres-listing.component';

describe('GenresListingComponent', () => {
  let component: GenresListingComponent;
  let fixture: ComponentFixture<GenresListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
