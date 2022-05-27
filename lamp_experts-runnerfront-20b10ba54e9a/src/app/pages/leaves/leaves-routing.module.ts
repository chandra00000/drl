import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeavesAddComponent } from './leaves-add/leaves-add.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component';


const routes: Routes = [{
  path: '', 
  children: [
      { path: '', component: LeavesListComponent },
      { path: 'add-leave', component: LeavesAddComponent },
      { path: 'edit-leave/:id', component: LeavesAddComponent },
    
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }
