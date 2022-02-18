import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailHistoryComponent } from './order-detail-history.component';

describe('OrderDetailHistoryComponent', () => {
  let component: OrderDetailHistoryComponent;
  let fixture: ComponentFixture<OrderDetailHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
