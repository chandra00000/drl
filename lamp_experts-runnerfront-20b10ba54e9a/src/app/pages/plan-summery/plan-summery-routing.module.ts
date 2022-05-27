import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlansummeryListComponent } from './plansummery-list/plansummery-list.component';
const routes: Routes = [{
  path: '', 
  children: [
      { path: '', component: PlansummeryListComponent },
    
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanSummeryRoutingModule { }
