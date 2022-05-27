import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationLiveviewComponent } from './location-liveview/location-liveview.component';
import { RunnerLiveviewComponent } from './runner-liveview/runner-liveview.component';
import { RunnerMapComponent } from './runner-map/runner-map.component';
import { TaskLiveviewComponent } from './task-liveview/task-liveview.component';
import { TaskMapComponent } from './task-map/task-map.component';

const routes: Routes = [{
  path: '', 
  children: [
      { path: '', component: TaskLiveviewComponent },
      { path: 'runner-view', component: RunnerLiveviewComponent },
      { path: 'runner-map', component: RunnerLiveviewComponent },
      { path: 'task-map/:id', component: TaskMapComponent },
      { path: 'runner-map/:id', component: RunnerMapComponent },
      { path: 'location-view', component: LocationLiveviewComponent },

  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveviewRoutingModule { }
