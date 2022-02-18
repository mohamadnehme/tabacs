import { TestBed } from '@angular/core/testing';

import { CustomerDetailHistoryResolver } from './customer-detail-history.resolver';

describe('CustomerDetailHistoryResolver', () => {
  let resolver: CustomerDetailHistoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CustomerDetailHistoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
