import { TestBed } from '@angular/core/testing';

import { PaymentHistoryResolver } from './payment-history.resolver';

describe('PaymentHistoryResolver', () => {
  let resolver: PaymentHistoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PaymentHistoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
