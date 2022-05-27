import {Injectable} from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable()
export class UtililtyFunctions {
    constructor(
        private AuthenticationService: AuthenticationService,
    ) { }

    public isAuthorized(){
        if (this.AuthenticationService.all_permissions.includes(this.AuthenticationService.permissions)) {
            return true;
        }else{
            return false;
        }
    }

}