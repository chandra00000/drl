import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { cityService } from 'src/app/services/city/city.service';
import { CustomersService } from 'src/app/services/customer/customer.service';
import { RoleService } from 'src/app/services/role/role.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    //for pagenation
    service: any = {
        page: 1,
        pageSize: 4,
        maxSize: 5
    };
    // to get the collection size Fro pagenation
    public collectionSize: any;

    //for shorting and Filter
    public sortColumn: any = 'created_at';
    public sortDirection: any = 'desc';


    public searchNamefilter: any = ''; //filter to search name

    public customerss: any;
    public userList: any = [];

    public isLoadedTable: boolean = true;


    public customerFilter: any = '';
    public cityFilter: any = '';
    public roleFilter: any = '';
    public statusFilter: any = '';
    public statelistForDropdown: any;
    public citylistForDropdown: any;
    public customerDropDown: any;
    public roleDropDown: any;
    //public addData = this.authService.permissions.includes('users-create');
    //public editData = this.authService.permissions.includes('users-edit');
    //public deleteData = this.authService.permissions.includes('users-delete');
   // public viewData = this.authService.permissions.includes('users-view');

    constructor(
        private userService: UserService,
        private router: Router,
        private modalService: NgbModal,
        private cityService: cityService,
        private customerService: CustomersService,
        private roleService: RoleService,
        private toastr: ToastrService,
        private authService: AuthenticationService
 
    ) { }


    ngOnInit(): void {
        this.refreshUsers();

/*
        this.roleService.obtainRoles('t=role_list').subscribe((data) => {
            this.roleDropDown = data.data;
        });
*/  
    }

    refreshUsers() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sort=${this.sortDirection}`;
        let filtersortColumn = `&sort_by=${this.sortColumn}`;

        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';

        //filter
        let statusFilter = this.statusFilter ? `&status=${this.statusFilter}` : '';
        let roleFilter = this.roleFilter ? `&role=${this.roleFilter}` : '';

        let param = `p=${this.service.page}${searchbox}${filtersortColumn}${short}${statusFilter}${roleFilter}`
        this.userService.obtainUsers(param).subscribe((data) => {
            this.userList = data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;

        });
    }

    //Search Customer
    searchCustomers() {
        //call api
        this.refreshUsers();
    }

    resetFilter() {
        this.searchNamefilter = '';
        this.customerFilter = '';
        this.statusFilter = '';
        this.roleFilter = '';
        this.refreshUsers();
    }


    //Short Customer
    sort(data: any) {
        //set clicked Column name
        this.sortColumn = data;
        //change asc to dsc or dsc to asc
        if (this.sortDirection == 'asc') {
            this.sortDirection = 'desc';
        } else {
            this.sortDirection = 'asc';
        }
        //call api
        this.refreshUsers();
    }

    addUser() {

        this.router.navigateByUrl('user/add', {
            state: {
                form: 'add'
            }
        });
    }

    editUser(id: any) {
        this.router.navigateByUrl('user/edit/' + id, {
            state: {
                form: 'edit'
            }
        });
    }
    
    delete(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this User?`,
            subTitle: data.first_name+" "+data.first_name,
            type: 'deleteUser',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshUsers();
        });
    }



    updateStatus(id: any, status: any) {
        this.userService.updateStatus(id, status).subscribe((res) => {
            if (res.sucess) {
                this.toastr.success(`${res.message}`);
                this.refreshUsers();
            } else {
                if (res.message) {
                    this.toastr.error(`${res.message}`);
                } else {
                    this.toastr.error(`Customer Not Added Successfully`);
                }
            }
        },
        (err: any) => {
            this.toastr.error(`${err}`);
            console.log(err);
        },);
    }

  
}
