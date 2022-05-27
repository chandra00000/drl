import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from './services/interceptor/token.interceptor';
import { RouterModule } from "@angular/router";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from "./components/components.module";
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { InterceptorService } from "./services/loader/interceptor.service";


import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { publicComponent } from "./layouts/public/public.component";
import { secureComponent } from "./layouts/secure/secure.component";
import { authComponent } from "./layouts/auth/auth.component";
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
    declarations: [
        AppComponent,
        secureComponent,
        publicComponent,
        authComponent,
     
        ForgotpasswordComponent,
        ResetpasswordComponent,
      
      
       
    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        ComponentsModule,
        ToastrModule.forRoot(),
        CollapseModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        TagInputModule,
        BrowserModule,
        AppRoutingModule,
        NgMultiSelectDropDownModule.forRoot()

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
        DatePipe,
        NgbActiveModal,

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
