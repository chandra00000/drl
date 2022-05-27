import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddOndemandComponent } from './task-add-ondemand.component';

describe('TaskAddOndemandComponent', () => {
  let component: TaskAddOndemandComponent;
  let fixture: ComponentFixture<TaskAddOndemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAddOndemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddOndemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
