import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialisingComponent } from './initialising.component';

describe('InitialisingComponent', () => {
  let component: InitialisingComponent;
  let fixture: ComponentFixture<InitialisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
