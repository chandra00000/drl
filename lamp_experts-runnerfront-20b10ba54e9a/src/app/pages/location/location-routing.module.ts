import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationListComponent } from './location-list/location-list.component';

const routes: Routes = [{
  path: '', 
  children: [
      { path: '', component: LocationListComponent },
      { path: 'add-location', component: LocationAddComponent },
      { path: 'add-location/:id', component: LocationAddComponent },
    
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
