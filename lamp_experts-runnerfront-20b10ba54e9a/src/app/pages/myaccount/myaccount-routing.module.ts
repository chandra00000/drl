import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuardsService } from "../../services/guards/auth-guards.service"
import { UpdatetpasswordComponent } from './updatetpassword/updatetpassword.component';

const routes: Routes = [{
  path: '', children: [
    { path: '', component: ProfileComponent, canActivate: [AuthGuardsService] },
    { path: 'update-password', component: UpdatetpasswordComponent , canActivate:[AuthGuardsService]}
     
  ]
}];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyaccountRoutingModule { }
