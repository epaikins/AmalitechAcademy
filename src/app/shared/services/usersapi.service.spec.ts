import { TestBed } from '@angular/core/testing';

import { UsersapiService } from './usersapi.service';

describe('UsersapiService', () => {
  let service: UsersapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
