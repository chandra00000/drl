import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CustomersService {
    constructor(private httpService: HttpService) { }
    
    submitToSlot(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/edit-customer-slot`
        return this.httpService.post(url, data, this.httpService.headers)

    }
    getAggregatorProvider(cid: any) {
        const url = `${environment.CustomerApiendpoint}/get-aggregator-provider/${cid}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    
    getallProvider() {
        const url = `${environment.CustomerApiendpoint}/get-providers`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    get_customers_contract_slot(data: any,cid: any) {
        const url = `${environment.CustomerApiendpoint}/get-customers-contract-slot/${data}/${cid}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getAllAvailableslot(data: any,cid: any) {
        const url = `${environment.CustomerApiendpoint}/customers-area-slot/${data}/${cid}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getCustomerSlot(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers-slot/${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    obtainCustomers(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers?${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    obtainCustomer(id:any, type:any){
        const url = `${environment.CustomerApiendpoint}/customers/${id}?t=${type}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    createCustomer(data: any, target:any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/customers?t=${target}`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    editCustomer(data: any, customer: any, target:any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/customers/${customer}?t=${target}`
        return this.httpService.put(url, data, this.httpService.headers)
    }


    createCustomer1(data: any, image: File, target:any): Observable<any> {
        const formData = new FormData();
        let imagefile = image ? image : null;
        formData.append('file', imagefile);
        formData.append('data', JSON.stringify(data));
        const url = `${environment.CustomerApiendpoint}/customers?t=${target}`;
        return this.httpService.post(url, formData, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    editCustomer1(data: any, customer: any,  image: File, target:any): Observable<any> {
        const formData = new FormData();
        let imagefile = image ? image : null;
        formData.append('file', imagefile);
        formData.append('data', JSON.stringify(data));

        const url = `${environment.CustomerApiendpoint}/customers-update/${customer}`
        return this.httpService.post(url, formData, this.httpService.headers)
    }

    deleteCustomer(id: any, target:any) {
        const url = `${environment.CustomerApiendpoint}/customers/${id}?t=${target}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }











    getallCustomer(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers?t=customers&${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

   


    
  

    
    downloadCustomer(): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/export-customers`;
        return this.httpService.post(url, {}, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }
    getallCustomers() {
        const url = `${environment.CustomerApiendpoint}/customers?t=all_customers`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    postCustomerMasterDetails(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/add-master-info`
        return this.httpService.post(url, data, this.httpService.headers)

    }

    postCustomerLabInfoDetails(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/add-lab-info`
        return this.httpService.post(url, data, this.httpService.headers)

    }

    postCustomerPincodeInfoDetails(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/customers`
        return this.httpService.post(url, data, this.httpService.headers)

    }
    postCustomerDosInfoDetails(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/add-dos`
        return this.httpService.post(url, data, this.httpService.headers)

    }
    postPriceDetails(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/add-contracted-price`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }
    getallLabLocationCustomer(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers?t=customer_lab&${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallAreacodeCustomer(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers?t=areacode${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallPincodeCustomer(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers?t=pincode${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }


    getallContactType() {
        const url = `${environment.SettingsApiendpoint}/get-contacttype-list`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
            
    }


    getAllLabLocations() {
        const url = `${environment.SettingsApiendpoint}/get-contacttype-list`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    getallDosCustomer(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers?t=customer_dos${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

getCustomer(data: any) {
    const url = `${environment.CustomerApiendpoint}/master-view/${data}`;
    return this.httpService.get(url, this.httpService.headers)
        .pipe(
            catchError(this.Errorhandling)
        );
}


    getallPriceCustomer(data: any) {
        const url = `${environment.CustomerApiendpoint}/customers?t=contracted_price${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    postCustomer(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/customer`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    updateCustomer(data: any, id: any, image?: File): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/customer/${id}`;
        return this.httpService.post(url, data, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    statusUpdateCustomer(data: any): Observable<any> {
        const url = `${environment.CustomerApiendpoint}/customers-status/${data.id}`;
        return this.httpService.put(url, data, this.httpService.headers)
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

function data(data: any, any: any) {
    throw new Error('Function not implemented.');
}

