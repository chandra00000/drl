import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanSummeryRoutingModule } from './plan-summery-routing.module';
import { PlansummeryListComponent } from './plansummery-list/plansummery-list.component';


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
  declarations: [PlansummeryListComponent],
 
  imports: [
  CommonModule,
  PlanSummeryRoutingModule,
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
export class PlanSummeryModule { }
