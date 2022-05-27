import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveModalComponent} from './leaveModal.component';

describe('leaveModalComponent', () => {
  let component: LeaveModalComponent;
  let fixture: ComponentFixture<LeaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveModalComponent ]
    })
    
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
