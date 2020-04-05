import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePlaybackControlComponent } from './page-playback-control.component';

describe('PagePlaybackControlComponent', () => {
  let component: PagePlaybackControlComponent;
  let fixture: ComponentFixture<PagePlaybackControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePlaybackControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePlaybackControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
