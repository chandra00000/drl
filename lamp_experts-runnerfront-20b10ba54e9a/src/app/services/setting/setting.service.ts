import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingService {

    constructor(private httpService: HttpService) { }
    

    customerblockDelete(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/customerblock/${data}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    //Citys APi
    saveBlock(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/customerblock`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    deletePartner(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/partner/${data}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    editPartner(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/edit-partner`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    savePartner(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/partner`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getPartenerForTable(data: any) {
        const url = `${environment.SettingsApiendpoint}/partners?${data}`;
        console.log(url);
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getCustomerBlockForTable(data: any) {
        const url = `${environment.SettingsApiendpoint}/customerblock?${data}`;
        console.log(url);
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getCitysForTable(data: any) {
        const url = `${environment.SettingsApiendpoint}/get-city?${data}`;
        console.log(url);
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    createCity(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/create-city`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    updateCity(data: any, id: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/cities/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    deleteCity(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/delete-city/${data}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    //AreaCode Api
    getAreaCodesForTable(data: any) {
        const url = `${environment.SettingsApiendpoint}/area-codes?${data}`;
        console.log(url);
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    createAreaCode(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/area-codes`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    updateAreaCode(data: any, id: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/area-codes/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    deleteAreaCode(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/area-codes/${data}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    allAreaCode(): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/area-codes-all`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    AllAreaCodeByCityId(cityid: any) {
        const url = `${environment.SettingsApiendpoint}/area-codes-by-city-id/${cityid}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    //Change Area code status
    updateAreaStatus(id: any, status: any): Observable<any> {
        let data = {
            status: status
        };
        const url = `${environment.SettingsApiendpoint}/area-codes-change-status/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    //Pincode Api
    getPincodesForTable(search: any) {
        const url = `${environment.SettingsApiendpoint}/pincode?${search}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    createPincode(data:any, imagefile: File) {
        const url = `${environment.SettingsApiendpoint}/pincode`;
        const formData = new FormData();

        formData.append('file', imagefile);

        // formData.append('data', new Blob([JSON.stringify(data)], {
        //     type: "application/json"
        // }));

        // formData.append('data', data);
        formData.append('data', JSON.stringify(data));

        return this.httpService
            .post(url, formData, this.httpService.headers)
            .pipe(catchError(this.Errorhandling));
    }

    updatePincode(data: any, Id:any) {
        const url = `${environment.SettingsApiendpoint}/pincode`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    deletePincode(id: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/pincode/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    //Master Dos Api
    getMasterDosForTable(search: any) {
        const url = `${environment.SettingsApiendpoint}/masterdos?${search}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    createMasterDos(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/masterdos`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    updateMasterDos(data: any, id): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/masterdos/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    deleteMasterDos(id: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/masterdos/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    uploadMasterDos(imagefile: File) {
        const url = `${environment.SettingsApiendpoint}/masterdos-import`;
        const formData = new FormData();
        formData.append('file', imagefile);

        return this.httpService.post(url, formData, this.httpService.headers)
            .pipe(catchError(this.Errorhandling));
    }

    getSingleDropLocation(id: any) {
        const url = `${environment.SettingsApiendpoint}/drop-location/${id}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    EditDroplocation(data: any,id:any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/drop-location/${id}`;
        return this.httpService.patch(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    AddDroplocation(data: any): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/drop-location`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    // pincode-export

    downloadPincode(): Observable<any> {
        const url = `${environment.SettingsApiendpoint}/pincode-export`;
        return this.httpService.get(url,this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
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
