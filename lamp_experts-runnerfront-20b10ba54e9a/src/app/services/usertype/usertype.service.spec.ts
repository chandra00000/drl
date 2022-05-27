import { TestBed } from '@angular/core/testing';

import { UserType } from './usertype.service';

describe('RoleService', () => {
  let service: UserType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserType);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
