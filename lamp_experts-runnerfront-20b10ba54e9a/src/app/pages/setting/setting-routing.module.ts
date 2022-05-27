import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city/city-list/city-list.component';
import { AuthGuardsService } from "../../services/guards/auth-guards.service"
import { ServicezoneListComponent } from './servicezone/servicezone-list/servicezone-list.component';


const routes: Routes = [{
    path: '', children: [
        { path: 'cities', component: CityListComponent, canActivate: [AuthGuardsService] },
        { path: 'service-zone', component: ServicezoneListComponent, canActivate: [AuthGuardsService] },


    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
