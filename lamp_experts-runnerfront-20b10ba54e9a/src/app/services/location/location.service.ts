import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private httpService: HttpService) { }

    getLocationList() {
        const url = `${environment.LocaionApiendpoint}/location/list`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    updateStatus(id: any, status: any): Observable<any> {
        const url = `${environment.LocaionApiendpoint}/location/${id}/${status}`
        return this.httpService.get(url, this.httpService.headers)
    }

    getallLocation(data: any) {
        const url = `${environment.LocaionApiendpoint}/location/list?${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    createLocation(data: any): Observable<any> {
        const url = `${environment.LocaionApiendpoint}/location/add`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    deleteLocation(data: any): Observable<any> {
        const url = `${environment.LocaionApiendpoint}/location/delete/${data}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    
    updateLocation(data: any, id: any): Observable<any> {
        const url = `${environment.LocaionApiendpoint}/location/edit/${id}`
        return this.httpService.put(url, data, this.httpService.headers)
    }
    getallstateandId() {
        const url = `${environment.SettingsApiendpoint}/get-states`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getallCitysandbyId(state_id:any) {
        const url = `${environment.SettingsApiendpoint}/cities-by-state-id/${state_id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }


    getallcityandId() {
        const url = `${environment.SettingsApiendpoint}/cities?d=all`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallareacodeandId(cityid: any) {
        const url = `${environment.SettingsApiendpoint}/area-codes-by-city-id/${cityid}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallpincodeandId(areacode_id: any) {
        const url = `${environment.SettingsApiendpoint}/pincode-by-areacode-id/${areacode_id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getCityStateByPincode(pincode: any) {
        const url = `${environment.OrderApiendpoint}/get-city-state-by-pincode/${pincode}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    
    getallDOSandId() {
        const url = `${environment.DosApiendpoint}/get-dos-test`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    
    getallSpecimenandId() {
        const url = `${environment.OrderApiendpoint}/get-specimen`;
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
