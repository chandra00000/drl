import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { pageLoaderComponent } from './pageLoader.component';

describe('pageLoaderComponent', () => {
    let component: pageLoaderComponent;
    let fixture: ComponentFixture<pageLoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [pageLoaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(pageLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
