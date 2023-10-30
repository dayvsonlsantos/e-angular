import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameTaskComponent } from './username-task.component';

describe('UsernameTaskComponent', () => {
  let component: UsernameTaskComponent;
  let fixture: ComponentFixture<UsernameTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsernameTaskComponent]
    });
    fixture = TestBed.createComponent(UsernameTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
