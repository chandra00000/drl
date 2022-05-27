import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { TourListComponent } from './tour-list/tour-list.component';
import { TourAddComponent } from './tour-add/tour-add.component';


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
  declarations: [TourListComponent, TourAddComponent],
  imports: [
    CommonModule,
    TourRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TagInputModule,
    NgbPaginationModule,
    NgbModule,
    ComponentsModule,
    
  ],
  providers: [
    DatePipe
  ]
})
export class TourModule { }
