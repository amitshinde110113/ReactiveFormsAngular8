import { TestBed } from '@angular/core/testing';

import { RegstrationService } from './regstration.service';

describe('RegstrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegstrationService = TestBed.get(RegstrationService);
    expect(service).toBeTruthy();
  });
});
