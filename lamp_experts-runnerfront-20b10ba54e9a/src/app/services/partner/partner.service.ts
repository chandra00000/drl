import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PartnerService {
    public Partnerdata: any;

    constructor(private httpService: HttpService) { }

    // savePartner(data: any): Observable<any> {
    //   const url = `${environment.baseUrl}/api/order`;
    //   return this.httpService
    //     .post(url, data, this.httpService.headers)
    //     .pipe(catchError(this.Errorhandling));

    // }
    
    
     
    getPartnerByclientId(id: any) {
        const url = `${environment.PartnerApiendpoint}/partnerListByClient/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallPartner() {
        const url = `${environment.PartnerApiendpoint}/get-runner/`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    addPartner(data: any): Observable<any> {
        const url = `${environment.PartnerApiendpoint }/createPartner`
        return this.httpService.post(url, data, this.httpService.headers)
    }

   
    deletePartner(id: any) {
        const url = `${environment.PartnerApiendpoint}/delete-runner/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    obtainPartner(user: any) {
        const url = `${environment.PartnerApiendpoint}/view/partner/${user}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    editPartner(data: any, Partner: any): Observable<any> {
        const url = `${environment.PartnerApiendpoint}/update/partner/${Partner}`
        return this.httpService.put(url, data, this.httpService.headers)
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
        const url = `${environment.PartnerApiendpoint}/Partner-change-status/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    obtainPartners(search: any) {
        const url = `${environment.PartnerApiendpoint}/getPartner?${search}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getAllCityById(id: any) {
        const url = `${environment.RunnerApiendpoint}/cities-by-state-id/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getAllCity() {
        const url = `${environment.RunnerApiendpoint}/cities?d=all`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getAllAreacodeById(id: any) {
        const url = `${environment.RunnerApiendpoint}/area-codes-by-city-id/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    // createRunner(data: any): Observable<any> {
    //   const url = `${environment.RunnerApiEndpoint}/Runners`;
    //   return this.httpService.post(url, data, this.httpService.headers);
    // }


    Errorhandling(err: HttpErrorResponse) {
        if (err.error instanceof ErrorEvent) {
            console.error(err.error.message);
        } else {
            console.error(`Backend returned code ${err.status}`);
        }
        return throwError('Please try again later.');
    }
}
