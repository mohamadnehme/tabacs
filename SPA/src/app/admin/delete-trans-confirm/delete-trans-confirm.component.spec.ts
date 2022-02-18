import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransConfirmComponent } from './delete-trans-confirm.component';

describe('DeleteTransConfirmComponent', () => {
  let component: DeleteTransConfirmComponent;
  let fixture: ComponentFixture<DeleteTransConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTransConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTransConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
