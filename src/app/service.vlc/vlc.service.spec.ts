import { TestBed } from '@angular/core/testing';

import { VlcService } from './vlc.service';

describe('VlcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VlcService = TestBed.get(VlcService);
    expect(service).toBeTruthy();
  });
});
