import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { TourService } from 'src/app/services/tour/tour.service';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
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
    public TourList: any = [];
    public TourFilter: any = '';
    public statusFilter: any = '';
    public roleFilter: any = '';
    public sortDirection: any = 'desc';
    public sortColumn: any = 'id';
    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    stateListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public stateFilter: any = '';
    statelistForDropdown: any;
    tourList: any;


    constructor(private router: Router,
        private modalService: NgbModal,
        private TourService: TourService,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService

    ) { }
     time24To12 = function(a) {
        //below date doesn't matter.
        return (new Date("1955-11-05T" + a + "Z")).toLocaleTimeString("bestfit", {
            timeZone: "UTC",
            hour12: !0,
            hour: "numeric",
            minute: "numeric"
        });
    };

    refreshTour() {
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

        this.TourService.obtainTours(`p=${this.service.page}${cityFilter}${stateFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.tourList =data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;


        });
    }

    onKeyEnter(event:any){
        this.refreshTour();
    }
    //Search Customer
    searchTour() {
        //call api
        this.refreshTour();

    }
    resetFilter() {
        this.cityFilter = '';
        this.stateFilter = '';
        this.statusFilter = '';
        this.searchNamefilter = '';
        this.refreshTour();
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
        this.refreshTour();
    }


    ngOnInit(): void {
    
        this.refreshTour();

     
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
  
    addTour() {
        this.router.navigateByUrl('tour/tour-add', {
            state: {
                form: 'add'
            }
        });
    }

    edit(id: any) {
        const url =
            this.router.navigateByUrl('tour/tour-edit/' + id, {
                state: {
                    form: 'edit'
                }
            });;

    }

   
    delete(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this Tour?`,
            subTitle: data.tour_name,
            type: 'deleteTour',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshTour();
        });
    }

    copy(data: any) {
        console.log("padam");
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Copy this Tour?`,
            subTitle: data.tour_name,
            type: 'copyTour',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshTour();
        });
    }



}
