import { Component, OnInit } from '@angular/core';
import { MyaccountService } from 'src/app/services/myaccount/myaccount.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public userid: any;
    public userdata: any;
    isLoadedTable: boolean;
    login_user: any;
    login_user_id: any;

    constructor(private MyaccountService: MyaccountService,
        private loginService: AuthenticationService  
        ) {
            this.login_user_id= this.loginService.user.id;

         }

    getprofile() {
        this.isLoadedTable = true;
        this.userid =this.login_user_id;
        this.MyaccountService.getuserinfo(this.userid).subscribe((data) => {
            this.isLoadedTable = false;
            this.userdata = data;

        });
    }

    ngOnInit(): void {

        this.getprofile();
    }

}
