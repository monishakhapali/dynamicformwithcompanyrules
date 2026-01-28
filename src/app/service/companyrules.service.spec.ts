import { TestBed } from '@angular/core/testing';

import { CompanyrulesService } from './companyrules.service';

describe('CompanyrulesService', () => {
  let service: CompanyrulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyrulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
