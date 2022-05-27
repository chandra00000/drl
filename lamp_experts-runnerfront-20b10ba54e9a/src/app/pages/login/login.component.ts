import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service'
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public adminDetails: any;
    public loginForm: FormGroup;
    public isLoginBtnLoaded: Boolean = false;
    showPass: boolean = false;

    constructor(
        private router: Router,
        private loginService: AuthenticationService,
        private toastr: ToastrService
    ) { }
    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    onLoginClick = function () {
        this.isLoginBtnLoaded = true;
        if (!this.loginForm.valid) {
            this.loginForm.markAllAsTouched();
        }
        else {
            this.loginService.adminlogin(this.loginForm.value).subscribe(
                (res: any) => {
                    this.router.navigate(['dashboard'])

                    if (res.message) {
                        this.toastr.success(`${res.message}`);
                    } else {
                        this.toastr.success(`Login Successful`);
                    }
                },
                (err: any) => {
                    this.toastr.error(`${err}`);
                    console.log(err);
                }, () => {
                    this.isLoginBtnLoaded = false;
                }
            )
        }
    };

    // click event function toggle
    password() {
        this.showPass = !this.showPass;
    }
}
