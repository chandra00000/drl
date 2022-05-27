import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansummeryListComponent } from './plansummery-list.component';

describe('PlansummeryListComponent', () => {
  let component: PlansummeryListComponent;
  let fixture: ComponentFixture<PlansummeryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansummeryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansummeryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
