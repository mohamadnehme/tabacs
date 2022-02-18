import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigareListComponent } from './cigare-list.component';

describe('CigareListComponent', () => {
  let component: CigareListComponent;
  let fixture: ComponentFixture<CigareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CigareListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CigareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
