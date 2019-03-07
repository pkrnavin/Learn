import { TestBed } from '@angular/core/testing';

import { OnlyNotLoggedInGuardService } from './only-not-logged-in-guard.service';

describe('OnlyNotLoggedInGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlyNotLoggedInGuardService = TestBed.get(OnlyNotLoggedInGuardService);
    expect(service).toBeTruthy();
  });
});
