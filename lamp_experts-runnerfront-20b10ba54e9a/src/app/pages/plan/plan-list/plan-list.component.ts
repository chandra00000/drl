import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhleboService } from 'src/app/services/phlebo/phlebo.service';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

    service: any = {
        page: 1,
        pageSize: 4,
        maxSize: 5
    };
    

    public sortColumnDefault: any = 'createdDate';
    public sortCustomersDefault: any = 'desc';
    public collectionSize: any = 50; // to get the collection size
    public sortCustomers: any;

    public searchNamefilter: any; //filter to search name

    public isLoadedTable: boolean = true;
    public id: any;
    public phleboList: any = [];
    public phleboFilter: any = '';
    public statusFilter: any = '';
    public roleFilter: any = '';
    public sortDirection: any = 'desc';
    public sortColumn: any = 'created_at';
  //  public addData = this.authService.permissions.includes('phlebos-create');
   // public editData = this.authService.permissions.includes('phlebos-edit');
    //public deleteData = this.authService.permissions.includes('phlebos-delete');

    //public viewData = this.authService.permissions.includes('phlebos-view');
    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    areaCodeListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public areacodeFilter: any = '';


    constructor(private router: Router,
        private modalService: NgbModal,
        private phleboService: PhleboService,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService

    ) { }


    refreshPhlebo() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sort=${this.sortDirection}`;
        let filtersortColumn = `&sort_by=${this.sortColumn}`;

        // s=Agraa&serving_area_code=38&p=1&sort_by=&sort=asc&limit=15
        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';

        let cityFilter = this.cityFilter ? `&serving_city=${this.cityFilter}` : '';
        let areacodeFilter = this.areacodeFilter ? `&serving_area_code=${this.areacodeFilter}` : '';

        this.phleboService.obtainPhlebos(`p=${this.service.page}${cityFilter}${areacodeFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.phleboList = data.data.data;
            this.collectionSize = data.data.recordsFiltered;
            this.isLoadedTable = false;


        });
    }

    onKeyEnter(event:any){
        this.refreshPhlebo();
    }
    //Search Customer
    searchPhlebos() {
        //call api
        this.refreshPhlebo();

    }
    resetFilter() {
        this.cityFilter = '';
        this.areacodeFilter = '';
        this.statusFilter = '';
        this.searchNamefilter = '';
        this.refreshPhlebo();
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
        this.refreshPhlebo();
    }


    ngOnInit(): void {
        this.refreshPhlebo();
        setTimeout(() => {
            this.isLoadedTable = false;
        }, 1000);
        this.refreshPhlebo();

        this.cityService.getallcityandId().subscribe((data) => {
            this.citylistForDropdown = data.data;
        });
    }

    getAreaCodebyCity(city_id: number) {
        this.phleboService.getAllAreacodeById(city_id).subscribe((data) => {
            this.areaCodeListForDropdown = data.data;
        });
    }

    addTask() {
        this.router.navigateByUrl('phlebos/add-phlebo', {
            state: {
                form: 'add'
            }
        });
    }

    editPhlebo(id: any) {
        const url =
            this.router.navigateByUrl('phlebos/edit-phlebo/' + id, {
                state: {
                    form: 'edit'
                }
            });;

    }





}
