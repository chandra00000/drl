import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLiveviewComponent } from './location-liveview.component';

describe('LocationLiveviewComponent', () => {
  let component: LocationLiveviewComponent;
  let fixture: ComponentFixture<LocationLiveviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationLiveviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationLiveviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
