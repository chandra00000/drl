import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadModalComponent } from './uploadModal.component';

describe('uploadModalComponent', () => {
  let component: uploadModalComponent;
  let fixture: ComponentFixture<uploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ uploadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(uploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
