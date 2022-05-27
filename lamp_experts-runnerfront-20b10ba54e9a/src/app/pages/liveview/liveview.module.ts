import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveviewRoutingModule } from './liveview-routing.module';
import { RunnerLiveviewComponent } from './runner-liveview/runner-liveview.component';
import { TaskLiveviewComponent } from './task-liveview/task-liveview.component';


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
import { RunnerMapComponent } from './runner-map/runner-map.component';
import { TaskMapComponent } from './task-map/task-map.component';
import { LocationLiveviewComponent } from './location-liveview/location-liveview.component';

@NgModule({
  declarations: [RunnerLiveviewComponent, TaskLiveviewComponent, RunnerMapComponent, TaskMapComponent, LocationLiveviewComponent],
  imports: [
    CommonModule,
    LiveviewRoutingModule,
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
export class LiveviewModule { }
