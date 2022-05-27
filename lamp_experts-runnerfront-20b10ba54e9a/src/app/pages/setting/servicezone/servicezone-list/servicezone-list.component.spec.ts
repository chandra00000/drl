import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicezoneListComponent } from './servicezone-list.component';

describe('ServicezoneListComponent', () => {
  let component: ServicezoneListComponent;
  let fixture: ComponentFixture<ServicezoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicezoneListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicezoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
