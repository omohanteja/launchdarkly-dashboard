import { TestBed } from '@angular/core/testing';

import { LaunchdarklyService } from './launchdarkly.service';

describe('LaunchdarklyService', () => {
  let service: LaunchdarklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchdarklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
