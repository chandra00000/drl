import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunnerAddComponent } from './runner-add/runner-add.component';
import { RunnerListComponent } from './runner-list/runner-list.component';

const routes: Routes = [{
  path: '', 
  children: [
      { path: '', component: RunnerListComponent },
      { path: 'add-runner', component: RunnerAddComponent },
      { path: 'edit-runner/:id', component: RunnerAddComponent },
    
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunnerRoutingModule { }
