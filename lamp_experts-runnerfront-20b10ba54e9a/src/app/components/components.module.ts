import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { deleteModalComponent } from "./deleteModal/deleteModal.component";

import { LoaderComponent } from "./loader/loader.component";
import { VectorMapComponent1 } from "./vector-map/vector-map.component";

import { RouterModule } from "@angular/router";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { DxVectorMapModule, DxPieChartModule } from 'devextreme-angular';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { pageLoaderComponent } from "./pageLoader/pageLoader.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EnterModalComponent } from "./enterModal/enterModal.component";
import { LocationModalComponent } from "./locationModal/locationModal.component";
import { LeaveModalComponent } from "./leaveModal/leaveModal.component";
import { TableModalComponent } from "./TableModal/TableModal.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule.forRoot(),
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        DxVectorMapModule,
        DxPieChartModule,
        BsDatepickerModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule

    ],
    declarations: [
        FooterComponent,
        VectorMapComponent1,
        NavbarComponent,
        SidebarComponent,
        deleteModalComponent,
        LoaderComponent,
        pageLoaderComponent,
        EnterModalComponent,
        LocationModalComponent,
        LeaveModalComponent,
        TableModalComponent

    ],
    exports: [
        FooterComponent,
        VectorMapComponent1,
        NavbarComponent,
        LoaderComponent,
        pageLoaderComponent,
        deleteModalComponent,
        SidebarComponent,
        EnterModalComponent,
        LocationModalComponent,
        LeaveModalComponent,
        TableModalComponent

    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class ComponentsModule { }
