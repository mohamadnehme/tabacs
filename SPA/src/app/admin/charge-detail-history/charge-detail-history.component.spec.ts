import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeDetailHistoryComponent } from './charge-detail-history.component';

describe('ChargeDetailHistoryComponent', () => {
  let component: ChargeDetailHistoryComponent;
  let fixture: ComponentFixture<ChargeDetailHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeDetailHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
