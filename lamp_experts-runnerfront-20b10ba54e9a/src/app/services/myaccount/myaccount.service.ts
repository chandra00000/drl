import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MyaccountService {
  constructor(private httpService: HttpService) {}

  getuserinfo(userid: any) {
    const url = `${environment.apiendpoint}/users/${userid}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  updatePassword(data: any, target: any): Observable<any> {
    const url = `${environment.apiendpoint}/update-password`;
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
