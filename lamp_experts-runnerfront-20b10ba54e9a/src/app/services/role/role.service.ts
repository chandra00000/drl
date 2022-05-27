import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpService: HttpService) { }

    obtainRoles(query: any) {
        const url = `${environment.UserApiendpoint}/roles?${query}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.ErrorHandling)
            );
    }

    createRole(data: any): Observable<any> {
        const url = `${environment.UserApiendpoint}/roles`
        return this.httpService.post(url, data, this.httpService.headers)
    }

    obtainRole(user: any) {
        const url = `${environment.UserApiendpoint}/roles/${user}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.ErrorHandling)
            );
    }

    editRole(data: any, user: any): Observable<any> {
        const url = `${environment.UserApiendpoint}/roles/${user}`
        return this.httpService.put(url, data, this.httpService.headers)
    }

    deleteRole(user: any) {
        const url = `${environment.UserApiendpoint}/roles/${user}`;
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
