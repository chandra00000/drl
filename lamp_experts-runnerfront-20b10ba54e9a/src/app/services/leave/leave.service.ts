import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    constructor(private httpService: HttpService) { }


    updateLeave(data: any, id: any): Observable<any> {
        const url = `${environment.leaveApiendpoint}/editleaves/${id}`
        return this.httpService.put(url, data, this.httpService.headers)
    }
    
    createLeave(data: any): Observable<any> {
        const url = `${environment.leaveApiendpoint}/createleaves`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallLeave(data: any) {
        const url = `${environment.leaveApiendpoint}/leavelist?${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    deleteLeave(id: any) {
        const url = `${environment.leaveApiendpoint}/deleteleaves/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    updateStatus(id: any, status: any) {
        const url = `${environment.leaveApiendpoint}/detail/${id}/${status}`;
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
