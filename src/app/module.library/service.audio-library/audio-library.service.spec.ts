import { TestBed } from '@angular/core/testing';

import { AudioLibraryService } from './audio-library.service';

describe('AudioLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioLibraryService = TestBed.get(AudioLibraryService);
    expect(service).toBeTruthy();
  });
});
