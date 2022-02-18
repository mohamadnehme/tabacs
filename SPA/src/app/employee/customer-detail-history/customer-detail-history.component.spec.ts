import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailHistoryComponent } from './customer-detail-history.component';

describe('CustomerDetailHistoryComponent', () => {
  let component: CustomerDetailHistoryComponent;
  let fixture: ComponentFixture<CustomerDetailHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
