import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTabacComponent } from './update-tabac.component';

describe('UpdateTabacComponent', () => {
  let component: UpdateTabacComponent;
  let fixture: ComponentFixture<UpdateTabacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTabacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTabacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
