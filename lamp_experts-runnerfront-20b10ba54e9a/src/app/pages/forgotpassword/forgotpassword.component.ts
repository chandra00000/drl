import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthenticationService } from '../../services/auth/authentication.service'
import { ForgotpasswordService } from '../../services/forgotpassword/forgotpassword.service';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  public adminDetails: any;
  public loginForm: FormGroup;
  public isLoginBtnLoaded: Boolean = false;
  showPass: boolean = false;

  constructor(
    private router: Router,
    private forgotpasswordService: ForgotpasswordService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  onSubmitClick = function () {
    
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.isLoginBtnLoaded = true;
      this.forgotpasswordService
        .forgotPasswordLink(this.loginForm.value)
        .subscribe(
          (res: any) => {
            this.router.navigate(['/']);

            if (res.message) {
              this.toastr.success(`${res.message}`);
            } else {
              this.toastr.success(
                `Reset password link has been sent to your email`
              );
            }
          },
          (err: any) => {
            this.toastr.error(`${err}`);
            console.log(err);
          },
          () => {
            this.isLoginBtnLoaded = false;
          }
        );
    }
  };

  // click event function toggle
  password() {
    this.showPass = !this.showPass;
  }
}
