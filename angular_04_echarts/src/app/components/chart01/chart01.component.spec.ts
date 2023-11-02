import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart01Component } from './chart01.component';

describe('Chart01Component', () => {
  let component: Chart01Component;
  let fixture: ComponentFixture<Chart01Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Chart01Component]
    });
    fixture = TestBed.createComponent(Chart01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
