import { TestBed } from '@angular/core/testing';

import { OnlyLoggedInUsersGuardService } from './only-logged-in-users-guard.service';

describe('OnlyLoggedInUsersGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlyLoggedInUsersGuardService = TestBed.get(OnlyLoggedInUsersGuardService);
    expect(service).toBeTruthy();
  });
});
