import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabacComponent } from './add-tabac.component';

describe('AddTabacComponent', () => {
  let component: AddTabacComponent;
  let fixture: ComponentFixture<AddTabacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTabacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTabacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
