import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TagInputModule } from 'ngx-chips';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [UserListComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
export class UsersModule { }
