import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardsService } from 'src/app/services/guards/auth-guards.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [{
  path: '', children: [
      { path: '', component: UserListComponent, canActivate:[AuthGuardsService]},
      { path: 'add', component: AddEditUserComponent, canActivate:[AuthGuardsService]},

      { path: 'edit/:id', component: AddEditUserComponent, canActivate:[AuthGuardsService]},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
