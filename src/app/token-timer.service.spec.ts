import { TestBed } from '@angular/core/testing';

import { TokenTimerService } from './token-timer.service';

describe('TokenTimerService', () => {
  let service: TokenTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
