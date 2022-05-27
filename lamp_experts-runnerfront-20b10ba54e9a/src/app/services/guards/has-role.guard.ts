import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private toastr: ToastrService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
            console.log('allper',this.authService.all_permissions);
            console.log('per',this.authService.permissions);
            
        const isAuthorized = this.authService.permissions.includes(route.data.role);

        console.log(isAuthorized);
        

        if (!isAuthorized) {
            // redirect
            // display a message
            this.toastr.error('you are not authorized');
        }

        return isAuthorized || false;
    }
}