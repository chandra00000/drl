import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viewModalComponent } from './viewModal.component';

describe('viewModalComponent', () => {
  let component: viewModalComponent;
  let fixture: ComponentFixture<viewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
