import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TourService {
    public Tourdata: any;

    constructor(private httpService: HttpService) { }

    getTourLocation(id: any)
    {
        const url = `${environment.LocaionApiendpoint}/location/point/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getTourLocationBytourId(id: any)
    {
        const url = `${environment.LocaionApiendpoint}/tour/tour_location/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    
    getTourByClientId(id: any) {
        const url = `${environment.LocaionApiendpoint}/tour/clients/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    copyTour(id: any) {
        const url = `${environment.LocaionApiendpoint}/tour/copy-tour/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    
    getallTour() {
        const url = `${environment.LocaionApiendpoint}/get-Tour/`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    addTour(data: any): Observable<any> {
        const url = `${environment.LocaionApiendpoint}/tour/add`
        return this.httpService.post(url, data, this.httpService.headers)
    }
    addTourLocation(data: any): Observable<any> {
        const url = `${environment.LocaionApiendpoint}/tour/add-tour`
        return this.httpService.post(url, data, this.httpService.headers)
    }
    deleteTourLocaion(id: any) {
        const url = `${environment.LocaionApiendpoint}/tour/delete_location_bytour/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    makeStartPoint(user: any) {
        
        const url = `${environment.LocaionApiendpoint}/tour/make-start-point/${user.id}/${user.tour_id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    makeEndPoint(user: any) {
        const url = `${environment.LocaionApiendpoint}/tour/make-end-point/${user.id}/${user.tour_id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    deleteTour(id: any) {
        const url = `${environment.LocaionApiendpoint}/tour/delete/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    obtainTour(user: any) {
        const url = `${environment.LocaionApiendpoint}/tour/view/${user}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    editTour(data: any, Tour: any): Observable<any> {
        const url = `${environment.LocaionApiendpoint}/tour/edit/${Tour}`
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
        const url = `${environment.SettingsApiendpoint}/Tour-change-status/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    obtainTours(search: any) {
        const url = `${environment.LocaionApiendpoint}/tour/list?${search}`;
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

    // createTour(data: any): Observable<any> {
    //   const url = `${environment.TourApiEndpoint}/Tours`;
    //   return this.httpService.post(url, data, this.httpService.headers);
    // }

    getTour(data: any): Observable<any> {
        this.Tourdata = [
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

        return this.Tourdata;
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
