import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotpasswordService {
  constructor(private httpService: HttpService) {}

  forgotPasswordLink(data: any, target: any): Observable<any> {
    const url = `${environment.apiendpoint}/forgot-password`;
    return this.httpService
      .post(url, data, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  resetPassword(data: any, target: any): Observable<any> {
    const url = `${environment.apiendpoint}/reset-password`;
    return this.httpService
      .post(url, data, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  Errorhandling(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error(err.error.message);
    } else {
      console.error(`Backend returned code ${err.status}`);
    }
    return throwError('Please try again later.');
  }
}
