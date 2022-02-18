import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigaretteListComponent } from './cigarette-list.component';

describe('CigaretteListComponent', () => {
  let component: CigaretteListComponent;
  let fixture: ComponentFixture<CigaretteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CigaretteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CigaretteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
