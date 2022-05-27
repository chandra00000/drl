import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLiveviewComponent } from './task-liveview.component';

describe('TaskLiveviewComponent', () => {
  let component: TaskLiveviewComponent;
  let fixture: ComponentFixture<TaskLiveviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskLiveviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLiveviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
