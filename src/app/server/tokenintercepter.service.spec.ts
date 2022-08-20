import { TestBed } from '@angular/core/testing';

import { TokenintercepterService } from './tokenintercepter.service';

describe('TokenintercepterService', () => {
  let service: TokenintercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenintercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
