import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositListComponent } from '../deposit-list/deposit-list.component';

import { DepositorListComponent } from './depositor-list.component';

describe('DepositListComponent', () => {
  let component: DepositListComponent;
  let fixture: ComponentFixture<DepositListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
