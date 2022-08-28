import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthServiceService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return boolean', () => {
    expect(typeof service.isAuthenticatedcheck()).toBe('boolean');
  });
  it('should be created', () => {
    expect(service.getEmail(undefined)).not.toBeTruthy();
  });
  it('should be created', () => {
    expect(service.getPassword(undefined)).not.toBeTruthy();
  });
});
