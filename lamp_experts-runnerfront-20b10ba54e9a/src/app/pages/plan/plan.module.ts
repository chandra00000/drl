import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanListComponent } from './plan-list/plan-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from "@angular/common";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [PlanListComponent],
 
  imports: [
    CommonModule,
    PlanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TagInputModule,
    NgbPaginationModule,
    NgbModule,
    ComponentsModule
    ],
    providers: [
      DatePipe
    ]
})
export class PlanModule { }
