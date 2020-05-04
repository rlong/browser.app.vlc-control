import { TestBed } from '@angular/core/testing';

import { VlcContextService } from './vlc-context.service';

describe('VlcContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VlcContextService = TestBed.get(VlcContextService);
    expect(service).toBeTruthy();
  });
});
