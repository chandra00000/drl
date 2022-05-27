import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RunnerService {
    public Runnerdata: any;

    constructor(private httpService: HttpService) { }

    // saveRunner(data: any): Observable<any> {
    //   const url = `${environment.baseUrl}/api/order`;
    //   return this.httpService
    //     .post(url, data, this.httpService.headers)
    //     .pipe(catchError(this.Errorhandling));

    // }
    
    onSaveLeave(data: any): Observable<any> {
        const url = `${environment.RunnerApiendpoint }/createleaves`
        return this.httpService.post(url, data, this.httpService.headers)
    }
    onSaveRoster(data: any,runner_id:any): Observable<any> {
        const url = `${environment.RunnerApiendpoint }/roster/${runner_id}`
        return this.httpService.post(url, data, this.httpService.headers)
    }

     
    getRunnerByclientId(id: any) {
        const url = `${environment.RunnerApiendpoint}/runnerListByClient/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallRunner() {
        const url = `${environment.RunnerApiendpoint}/get-runner/`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    addRunner(data: any): Observable<any> {
        const url = `${environment.RunnerApiendpoint }/create-runner`
        return this.httpService.post(url, data, this.httpService.headers)
    }


    deleteRunner(id: any) {
        const url = `${environment.RunnerApiendpoint}/delete-runner/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    obtainRunner(user: any) {
        const url = `${environment.RunnerApiendpoint}/view/${user}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    editRunner(data: any, Runner: any): Observable<any> {
        const url = `${environment.RunnerApiendpoint}/update-runner/${Runner}`
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
        const url = `${environment.RunnerApiendpoint}/Runner-change-status/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    obtainRunners(search: any) {
        const url = `${environment.RunnerApiendpoint}/get-runner?${search}`;
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

    getRunner(data: any): Observable<any> {
        this.Runnerdata = [
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

        return this.Runnerdata;
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
