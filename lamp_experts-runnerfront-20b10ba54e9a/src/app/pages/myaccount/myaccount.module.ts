import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyaccountRoutingModule } from './myaccount-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UpdatetpasswordComponent } from './updatetpassword/updatetpassword.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [ProfileComponent, UpdatetpasswordComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MyaccountRoutingModule,
    ComponentsModule,
  ],
})
export class MyaccountModule {}
