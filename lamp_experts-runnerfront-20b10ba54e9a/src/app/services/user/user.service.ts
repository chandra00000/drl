import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpService: HttpService) { }

    obtainUsers(query: any) {
        const url = `${environment.UserApiendpoint}/user/list?${query}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.ErrorHandling)
            );
    }
    
    createUser(data: any): Observable<any> {
        const url = `${environment.UserApiendpoint}/user/create`
        return this.httpService.post(url, data, this.httpService.headers)
    }

    getUserRoles(id: any) {
        const url = `${environment.UserApiendpoint}/get-roles/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.ErrorHandling)
            );
    }

    obtainUser(user: any) {
        const url = `${environment.UserApiendpoint}/user/view/${user}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.ErrorHandling)
            );
    }

    editUser(data: any, user: any): Observable<any> {
        const url = `${environment.UserApiendpoint}/user/edit/${user}`
        return this.httpService.put(url, data, this.httpService.headers)
    }

    updateStatus(id: any, status: any): Observable<any> {
        const url = `${environment.UserApiendpoint}/user/${id}/${status}`
        return this.httpService.get(url, this.httpService.headers)
    }

    deleteUser(user: any) {
        const url = `${environment.UserApiendpoint}/user/delete/${user}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(catchError(this.ErrorHandling))
    }

    ErrorHandling(err: HttpErrorResponse) {
        if (err.error instanceof ErrorEvent) {
            console.error(err.error.message);
        } else {
            console.error(`Backend returned code ${err.status}`);
        }
        return throwError('Please try again later.');
    }
}
