import { TestBed } from '@angular/core/testing';

import { HowlService } from './howl.service';

describe('HowlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HowlService = TestBed.get(HowlService);
    expect(service).toBeTruthy();
  });
});
