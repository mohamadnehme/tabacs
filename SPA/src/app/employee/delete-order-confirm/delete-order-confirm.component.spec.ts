import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderConfirmComponent } from './delete-order-confirm.component';

describe('DeleteOrderConfirmComponent', () => {
  let component: DeleteOrderConfirmComponent;
  let fixture: ComponentFixture<DeleteOrderConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrderConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
