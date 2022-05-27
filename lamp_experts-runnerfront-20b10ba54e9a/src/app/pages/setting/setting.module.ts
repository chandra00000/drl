import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityAddEditComponent } from './city/city-add-edit/city-add-edit.component';
import { ServicezoneListComponent } from './servicezone/servicezone-list/servicezone-list.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
    declarations: [
        CityListComponent,
        CityAddEditComponent,
        ServicezoneListComponent,
      
    ],
    imports: [
        CommonModule,
        SettingRoutingModule,
        CommonModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        ToastrModule.forRoot(),
        CollapseModule.forRoot(),
        TagInputModule,
        NgbPaginationModule,
        NgbModule,
    ]
})
export class SettingModule { }
