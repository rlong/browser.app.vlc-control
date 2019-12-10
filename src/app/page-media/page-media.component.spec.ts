import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMediaComponent } from './page-media.component';

describe('PageMediaComponent', () => {
  let component: PageMediaComponent;
  let fixture: ComponentFixture<PageMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
