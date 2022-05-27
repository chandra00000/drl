import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerLiveviewComponent } from './runner-liveview.component';

describe('RunnerLiveviewComponent', () => {
  let component: RunnerLiveviewComponent;
  let fixture: ComponentFixture<RunnerLiveviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunnerLiveviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunnerLiveviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
