import { TestBed } from '@angular/core/testing';

import { AlwaysAuthChildrenGuardService } from './always-auth-children-guard.service';

describe('AlwaysAuthChildrenGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlwaysAuthChildrenGuardService = TestBed.get(AlwaysAuthChildrenGuardService);
    expect(service).toBeTruthy();
  });
});
