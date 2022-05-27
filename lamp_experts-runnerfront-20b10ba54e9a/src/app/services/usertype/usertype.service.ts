import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
    
export class UserType {

  constructor(private httpService: HttpService) { }

    getUserType(query: any) {
        const url = `${environment.UserApiendpoint}/usertype`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.ErrorHandling)
            );
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
