import { TestBed } from '@angular/core/testing';

import { CustomerListResolver } from './customer-list.resolver';

describe('CustomerListResolver', () => {
  let resolver: CustomerListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CustomerListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
