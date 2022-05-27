import { HttpErrorResponse, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService: HttpService) { }


getLiveDashboard(data: any) {

  const url = `${environment.OrderApiendpoint}/get-dashboard?d=live${data}`;
  console.log(url);
  return this.httpService.get(url, this.httpService.headers)
      .pipe(
          catchError(this.Errorhandling)
      );
}


getHistoricalDashboard(data: any) {

  const url = `${environment.OrderApiendpoint}/get-dashboard?d=historical${data}`;
  console.log(url);
  return this.httpService.get(url, this.httpService.headers)
      .pipe(
          catchError(this.Errorhandling)
      );
}



getPhleboLiveDashboard(data: any) {

  const url = `${environment.OrderApiendpoint}/get-dashboard-phlebo?d=live${data}`;
  console.log(url);
  return this.httpService.get(url, this.httpService.headers)
      .pipe(
          catchError(this.Errorhandling)
      );
}



getPhleboHistoricalDashboard(data: any) {

  const url = `${environment.OrderApiendpoint}/get-dashboard-phlebo?d=historical${data}`;
  console.log(url);
  return this.httpService.get(url, this.httpService.headers)
      .pipe(
          catchError(this.Errorhandling)
      );
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
