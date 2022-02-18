/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabacListComponent } from './tabacList.component';

describe('TabacListComponent', () => {
  let component: TabacListComponent;
  let fixture: ComponentFixture<TabacListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabacListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabacListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
