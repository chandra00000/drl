import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourAddComponent } from './tour-add/tour-add.component';
import { TourListComponent } from './tour-list/tour-list.component';


const routes: Routes = [{
  path: '', 
  children: [
      { path: '', component: TourListComponent },
      { path: 'tour-add', component: TourAddComponent },
      { path: 'tour-edit/:id', component: TourAddComponent },

  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule { }
