import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { EnterModalComponent } from 'src/app/components/enterModal/enterModal.component';
import { LeaveModalComponent } from 'src/app/components/leaveModal/leaveModal.component';

@Component({
  selector: 'app-runner-list',
  templateUrl: './runner-list.component.html',
  styleUrls: ['./runner-list.component.scss']
})
export class RunnerListComponent implements OnInit {
    service: any = {
        page: 1,
        pageSize: 4,
        maxSize: 5
    };
    

    public sortColumnDefault: any = 'createdAt';
    public sortCustomersDefault: any = 'desc';
    public collectionSize: any = 50; // to get the collection size
    public sortCustomers: any;

    public searchNamefilter: any; //filter to search name

    public isLoadedTable: boolean = true;
    public id: any;
    public runnerList: any = [];
    public runnerFilter: any = '';
    public statusFilter: any = '';
    public roleFilter: any = '';
    public sortDirection: any = 'desc';
    public sortColumn: any = 'createdAt';
   // public addData = this.authService.permissions.includes('runners-create');
   // public editData = this.authService.permissions.includes('runners-edit');
    //public deleteData = this.authService.permissions.includes('runners-delete');

    //public viewData = this.authService.permissions.includes('runners-view');
    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    areaCodeListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public stateFilter: any = '';
    statelistForDropdown: any;


    constructor(
        private router: Router,
        private modalService: NgbModal,
        private runnerService: RunnerService,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService,

    ) { }


    refreshRunner() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sd=${this.sortDirection}`;
        let filtersortColumn = `&sb=${this.sortColumn}`;

        // s=Agraa&serving_area_code=38&p=1&sort_by=&sort=asc&limit=15
        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';

        let cityFilter = this.cityFilter ? `&serving_city=${this.cityFilter}` : '';
        let stateFilter = this.stateFilter ? `&serving_area_code=${this.stateFilter}` : '';

        this.runnerService.obtainRunners(`p=${this.service.page}${cityFilter}${stateFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.runnerList = data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;


        });
    }

    onKeyEnter(event:any){
        this.refreshRunner();
    }
    //Search Customer
    searchRunner() {
        //call api
        this.refreshRunner();

    }
    resetFilter() {
        this.cityFilter = '';
        this.stateFilter = '';
        this.searchNamefilter = '';
        this.refreshRunner();
    }

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
        this.refreshRunner();
    }


    ngOnInit(): void {
      
        this.refreshRunner();

        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
          
        });

       
   
    }
    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }

    addRunner() {
        this.router.navigateByUrl('runner/add-runner', {
            state: {
                form: 'add'
            }
        });
    }

    editRunner(id: any) {
        const url =
            this.router.navigateByUrl('runner/edit-runner/' + id, {
                state: {
                    form: 'edit'
                }
            });;

    }

 
    viewRoster(data: any) {
        const modalRef = this.modalService.open(EnterModalComponent, {
            centered: true,
            size: 'md',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Manage Roster`,
            subTitle: '',
            type: 'viewRoster',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshRunner();
        });
    }
    viewLeave(data: any) {
        const modalRef = this.modalService.open(LeaveModalComponent, {
            centered: true,
            size: 'lg',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Manage Leave`,
            subTitle: '',
            type: 'viewLeave',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshRunner();
        });
    }
    deleteRunner(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this Runner?`,
            subTitle: data.first_name+" "+data.last_name,
            type: 'deleteRunner',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshRunner();
        });
    }


}
