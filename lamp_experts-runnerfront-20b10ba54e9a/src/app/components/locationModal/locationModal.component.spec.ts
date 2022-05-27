import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { locationModalComponent } from './locationModal.component';

describe('locationModalComponent', () => {
  let component: locationModalComponent;
  let fixture: ComponentFixture<locationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ locationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(locationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
