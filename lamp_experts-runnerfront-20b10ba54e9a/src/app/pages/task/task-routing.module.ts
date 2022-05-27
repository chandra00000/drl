import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskAddOndemandComponent } from './task-add-ondemand/task-add-ondemand.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskViewComponent } from './task-view/task-view.component';

const routes: Routes = [{
    path: '', 
    children: [
        { path: '', component: TaskListComponent },
        { path: 'add-task', component: TaskAddComponent },
        { path: 'add-task-ondemand', component: TaskAddOndemandComponent },

        { path: 'edit-task/:id', component: TaskAddComponent },
        { path: 'edit-task-ondemand/:id', component: TaskAddOndemandComponent },
        { path: 'view-task/:id', component: TaskViewComponent },

    ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
