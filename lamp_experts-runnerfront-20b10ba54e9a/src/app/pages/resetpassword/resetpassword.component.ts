import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotpasswordService } from '../../services/forgotpassword/forgotpassword.service';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  public adminDetails: any;
  public resetPasswordForm: FormGroup;
  public isLoginBtnLoaded: Boolean = false;
  showPass: boolean = false;
  public userId: any;
  public passwordToken: any;

  constructor(
    private router: Router,
    private forgotpasswordService: ForgotpasswordService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.passwordToken = this.route.snapshot.params['password_token'];
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      userId: new FormControl(''),
      passwordToken: new FormControl(''),
    });
  }

  onSubmitClick = function () {
    if (!this.resetPasswordForm.valid) {
      this.resetPasswordForm.markAllAsTouched();
    } else {
      if (
          this.resetPasswordForm.value.newPassword == this.resetPasswordForm.value.confirmNewPassword
      ) {
        this.resetPasswordForm.patchValue({ userId: this.userId, passwordToken:this.passwordToken });
        //console.log(this.resetPasswordForm.value); return;
        
        this.isLoginBtnLoaded = true;
        this.forgotpasswordService
          .resetPassword(this.resetPasswordForm.value)
          .subscribe(
            (res: any) => {
              this.router.navigate(['login']);
              if (res.message) {
                this.toastr.success(`${res.message}`);
              } else {
                this.toastr.success(`Password updated successfully`);
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
      } else {
        this.toastr.success(`Password and confirm password are not same`);
      }
    }
  };

  // click event function toggle
  password() {
    this.showPass = !this.showPass;
  }
}
