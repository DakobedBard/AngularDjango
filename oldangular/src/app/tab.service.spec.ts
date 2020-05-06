import { TestBed } from '@angular/core/testing';

import { TabService } from './tabs/tab.service';

describe('TabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabService = TestBed.get(TabService);
    expect(service).toBeTruthy();
  });
});
