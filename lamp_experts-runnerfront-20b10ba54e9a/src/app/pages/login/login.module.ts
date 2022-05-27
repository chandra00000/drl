import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../../components/components.module";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule, ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        ToastrModule.forRoot(),
        CollapseModule.forRoot(),
        TagInputModule,
        ComponentsModule
    ],
    exports: []
})
export class LoginModule { }
