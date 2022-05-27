import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { deleteModalComponent } from './deleteModal.component';

describe('deleteModalComponent', () => {
  let component: deleteModalComponent;
  let fixture: ComponentFixture<deleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ deleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(deleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
