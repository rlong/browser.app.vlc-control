import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStylingsComponent } from './page-stylings.component';

describe('PageStylingsComponent', () => {
  let component: PageStylingsComponent;
  let fixture: ComponentFixture<PageStylingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageStylingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStylingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
