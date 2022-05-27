import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from "../auth/authentication.service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

    validationErrors(errors_obj) {
        let errors = Object.values(errors_obj);
        // errors = errors.flat();
        return errors;
    }
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const adminDetails = this.authService.token;
        let token = '';
        let refresh_token = '';
        let token_type = '';

        if (adminDetails) {
          //  token = adminDetails.access_token;
          token = adminDetails;
            refresh_token = adminDetails.refresh_token;
         //   token_type = adminDetails.token_type;
         token_type ="Bearer";
        }

        let setHeader = {};
        if (!request.url.includes('/login')) {
            setHeader = {
                Authorization: `${token_type} ${token}`,
               // refresh_token: `${refresh_token}`,
            }
        }
        const modified = request.clone({
            headers: new HttpHeaders(setHeader)
        });

        return next.handle(modified).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                  /*  if(evt.body){
                        if (evt.body.token) {
                            setHeader = {
                                Authorization: `${evt.body.token_type} ${evt.body.access_token}`,
                                refresh_token: `${evt.body.refresh_token}`,
                            }
                            localStorage.setItem('token', JSON.stringify(setHeader));
                        }
                    } */
                }
            }),

            catchError((error) => {
                console.log(error)
                if (!error.error.success) {
                    if (typeof (error.error.error) == 'object') {
                        let obj = error.error.error
                        let item: any
                        for (item of this.validationErrors(obj)) {
                            this.toastr.error(item);
                        }
                        return of(error);
                    } else {
                        if (error.status == 500) {
                            this.toastr.error(error.statusText);
                            return of(error);
                        }
                        if (error.status == 0) {
                            this.toastr.error(error.statusText);
                            return of(error);
                        }

                        this.router.navigate(['/login'])

                        this.toastr.error(error.error.error);
                        return of(error);
                    }

                }

                if (error.error && error.error.text) {
                    this.toastr.error(error.error.text);
                }
                else {
                    this.toastr.error('Server is not responding at the moment');
                    console.log(error);
                }

                return of(error);
            })
        )
    }
}
