import { TestBed } from '@angular/core/testing';

import { SessionContextService } from './session-context.service';

describe('SessionContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionContextService = TestBed.get(SessionContextService);
    expect(service).toBeTruthy();
  });
});
