import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyaccountService } from 'src/app/services/myaccount/myaccount.service';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatetpassword',
  templateUrl: './updatetpassword.component.html',
  styleUrls: ['./updatetpassword.component.scss'],
})
export class UpdatetpasswordComponent implements OnInit {
  public adminDetails: any;
  public updatePasswordForm: FormGroup;
  public isLoginBtnLoaded: Boolean = false;
  public showPass: boolean = false;

  constructor(
    private router: Router,
    private myaccountService: MyaccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.updatePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmitClick = function () {
    if (!this.updatePasswordForm.valid) {
      this.updatePasswordForm.markAllAsTouched();
     
    } else {
      
      if (this.updatePasswordForm.value.newPassword == this.updatePasswordForm.value.confirmNewPassword) {
         this.isLoginBtnLoaded = true;
        //console.log(this.updatePasswordForm.value); return;
        this.myaccountService
          .updatePassword(this.updatePasswordForm.value)
          .subscribe(
            (res: any) => {
              this.logout();
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
        this.toastr.error(`New Password and confirm password are not same`);
      }
    }
  };

  logout() {
    this.router.navigate(['/login']);
    return localStorage.clear();
  }
}
