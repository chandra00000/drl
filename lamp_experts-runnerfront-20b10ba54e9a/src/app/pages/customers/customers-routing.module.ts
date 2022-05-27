import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersAddComponent } from './customers-add/customers-add.component';
import { CustomersListComponent } from './customers-list/customers-list.component';


const routes: Routes = [{
  path: '', 
  children: [
      { path: '', component: CustomersListComponent },
      { path: 'add-customer', component: CustomersAddComponent },
      { path: 'edit-customer/:id', component: CustomersAddComponent },
    
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
