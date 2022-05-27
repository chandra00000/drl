import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class cityService {
    constructor(private httpService: HttpService) { }


    getallcity(data: any) {
        const url = `${environment.SettingsApiendpoint}/get-city?${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getallstateandId() {
        const url = `${environment.SettingsApiendpoint}/get-states`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getallCitysandbyId(state_id:any) {
        const url = `${environment.SettingsApiendpoint}/get-city-by-id/${state_id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallcityandId() {
        const url = `${environment.SettingsApiendpoint}/get-city-by-id/0`;
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
