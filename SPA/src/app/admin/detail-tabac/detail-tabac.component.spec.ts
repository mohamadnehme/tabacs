import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTabacComponent } from './detail-tabac.component';

describe('DetailTabacComponent', () => {
  let component: DetailTabacComponent;
  let fixture: ComponentFixture<DetailTabacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTabacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTabacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
