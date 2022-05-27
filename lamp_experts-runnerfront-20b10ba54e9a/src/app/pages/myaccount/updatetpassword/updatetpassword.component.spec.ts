import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetpasswordComponent } from './updatetpassword.component';

describe('UpdatetpasswordComponent', () => {
  let component: UpdatetpasswordComponent;
  let fixture: ComponentFixture<UpdatetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
