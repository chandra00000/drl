import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public basePath: any = environment.apiendpoint;
    public user: any;
    public all_permissions: any;
    public permissions: any;
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {
        this._isLoggedIn$.next(!!this.token);
        if (this.token) {
            this.user = this.geuser ? this.geuser : '';
            this.permissions = this.getpermissions ? this.getpermissions : '';
            this.all_permissions = this.getall_permissions ? this.getall_permissions : '';
        }
    }

    adminlogin(data: any) {
        const url = `${this.basePath}/auth/login`
        return this.http.post(url, data).pipe(
            tap((response: any) => {
                this._isLoggedIn$.next(true);
                this.user = response.obj.userRes;
                localStorage.setItem('token', JSON.stringify(response.obj.token));
                localStorage.setItem('user', JSON.stringify(response.obj.userRes));
               /*   
                let thisper = [];
                response.data.permissions.map(val => {
                    thisper.push(val.name);
                });
                
              let thisallper = [];
                response.data.all_permissions.map(val => {
                    thisallper.push(val.name);
                });
                
                localStorage.setItem('permissions', JSON.stringify(thisper));
                localStorage.setItem('all_permissions', JSON.stringify(thisallper));
                
                this.permissions = thisper;
                this.all_permissions = thisallper;
                */
            })
        );
    }

    get token() {
        return JSON.parse(localStorage.getItem('token'));
    }

    get getpermissions() {
        return JSON.parse(localStorage.getItem('permissions'));
    }
    

    get getall_permissions() {
        return JSON.parse(localStorage.getItem('all_permissions'));
    }
    

    get geuser() {
        return JSON.parse(localStorage.getItem('user'));
    }
   
    
    logout() {
        this.router.navigate(['/login'])
        return localStorage.clear();
    }
}
