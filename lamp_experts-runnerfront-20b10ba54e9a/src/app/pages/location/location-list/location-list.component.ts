import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhleboService } from 'src/app/services/phlebo/phlebo.service';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { LocationService } from 'src/app/services/location/location.service';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { LocationAddComponent } from '../location-add/location-add.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

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
    public sortColumn: any = 'id';
  //  public addData = this.authService.permissions.includes('phlebos-create');
   // public editData = this.authService.permissions.includes('phlebos-edit');
    //public deleteData = this.authService.permissions.includes('phlebos-delete');

   // public viewData = this.authService.permissions.includes('phlebos-view');
    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    areaCodeListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public areacodeFilter: any = '';
    stateFilter: any = '';
    locationList: any;
    statelistForDropdown: any;


    constructor(private router: Router,
        private modalService: NgbModal,
        private locationService:LocationService ,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService,
        public datepipe: DatePipe,

    ) { }


    refreshLocation() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sort=${this.sortDirection}`;
        let filtersortColumn = `&sort_by=${this.sortColumn}`;

        // s=Agraa&serving_area_code=38&p=1&sort_by=&sort=asc&limit=15
        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';

        let cityFilter = this.cityFilter ? `&city=${this.cityFilter}` : '';
        let stateFilter = this.stateFilter ? `&state=${this.stateFilter}` : '';

        this.locationService.getallLocation(`p=${this.service.page}${cityFilter}${stateFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
           console.log(data);
           
            this.locationList = data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;


        });
    }

    onKeyEnter(event:any){
        this.refreshLocation();
    }
    //Search Customer
    searchLocation() {
        //call api
        this.refreshLocation();

    }
    resetFilter() {
        this.cityFilter = '';
        this.stateFilter = '';
        this.searchNamefilter = '';
        this.refreshLocation();
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
        this.refreshLocation();
    }


    ngOnInit(): void {
        this.refreshLocation();
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

    add() {
      
        const modalRef = this.modalService.open(LocationAddComponent, {
            centered: true,
            size: 'sm',
        });
        modalRef.componentInstance.props = {
            title: 'Add Location',
            type: 'add',          
            page: `page=${this.service.page}`,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshLocation();
        })
    }

    edit(data: any) {
        const modalRef = this.modalService.open(LocationAddComponent, {
            centered: true,
            size: 'sm',
        });
        modalRef.componentInstance.props = {
            title: 'Edit Location',
            type: 'edit',
            page: `page=${this.service.page}`,
            data: data
        }
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshLocation()
        })
    }

   
    delete(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this Location?`,
            subTitle: data.location_name,
            type: 'deleteLocation',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshLocation();
        });
    }
    updateStatus(id: any, status: any) {
        this.locationService.updateStatus(id, status).subscribe((res) => {
            if (res.sucess) {
                this.toastr.success(`${res.message}`);
                this.refreshLocation();
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
