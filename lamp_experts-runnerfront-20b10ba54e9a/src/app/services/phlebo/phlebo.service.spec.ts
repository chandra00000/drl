import { TestBed } from '@angular/core/testing';

import { PhleboService } from './phlebo.service';

describe('PhleboService', () => {
  let service: PhleboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhleboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
