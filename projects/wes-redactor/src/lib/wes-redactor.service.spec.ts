import { TestBed } from '@angular/core/testing';

import { WesRedactorService } from './wes-redactor.service';

describe('WesRedactorService', () => {
  let service: WesRedactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WesRedactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
