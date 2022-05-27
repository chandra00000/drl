import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PhleboService {
    public phlebodata: any;

    constructor(private httpService: HttpService) { }

    // savePhlebo(data: any): Observable<any> {
    //   const url = `${environment.baseUrl}/api/order`;
    //   return this.httpService
    //     .post(url, data, this.httpService.headers)
    //     .pipe(catchError(this.Errorhandling));

    // }

    
    getallPhlebo() {
        const url = `${environment.SettingsApiendpoint}/get-phlebos/`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    addPhlebo(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/phlebos`
        return this.httpService.post(url, data, this.httpService.headers)
    }


    deletePhlebo(id: any) {
        const url = `${environment.SettingsApiendpoint}/phlebos/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    obtainPhlebo(user: any) {
        const url = `${environment.SettingsApiendpoint}/phlebos/${user}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    editPhlebo(data: any, phlebo: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/phlebos/${phlebo}`
        return this.httpService.patch(url, data, this.httpService.headers)
    }

    updateStatus(id: any, status: any): Observable<any> {
        console.log(status);
        console.log(id);
        
        let data ;
        if (status == 'Active') {
            data = {
                status: 'Inactive'
            };
        }else{
            data = {
                status: 'Active'
            };
        }
        const url = `${environment.SettingsApiendpoint}/phlebo-change-status/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    obtainPhlebos(search: any) {
        const url = `${environment.SettingsApiendpoint}/phlebos?${search}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getAllCityById(id: any) {
        const url = `${environment.SettingsApiendpoint}/cities-by-state-id/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getAllCity() {
        const url = `${environment.SettingsApiendpoint}/cities?d=all`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getAllAreacodeById(id: any) {
        const url = `${environment.SettingsApiendpoint}/area-codes-by-city-id/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    // createPhlebo(data: any): Observable<any> {
    //   const url = `${environment.PhleboApiEndpoint}/phlebos`;
    //   return this.httpService.post(url, data, this.httpService.headers);
    // }

    getPhlebo(data: any): Observable<any> {
        this.phlebodata = [
            {
                id: '1',
                emp_code: '123',
                first_name: 'Abhishek',
                last_name: 'Anand',
                email: 'temp@email.com',
                phone: '25012021',
                status: 'Active',
                city: 'Dehradun',
                state: 'Uttarakhand',
            },
        ];

        return this.phlebodata;
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
