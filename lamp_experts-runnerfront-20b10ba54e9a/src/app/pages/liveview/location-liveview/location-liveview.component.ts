import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhleboService } from 'src/app/services/phlebo/phlebo.service';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { TaskService } from 'src/app/services/task/task.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-location-liveview',
  templateUrl: './location-liveview.component.html',
  styleUrls: ['./location-liveview.component.scss']
})
export class LocationLiveviewComponent implements OnInit {

    service: any = {
        page: 1,
        pageSize: 4,
        maxSize: 5
    };
    

    public sortColumnDefault: any = 'createdDate';
    public sortCustomersDefault: any = 'desc';
    public collectionSize: any = 50; // to get the collection size
    public sortCustomers: any;
    public stateFilter: any = '';
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
//public editData = this.authService.permissions.includes('phlebos-edit');
   /// public deleteData = this.authService.permissions.includes('phlebos-delete');

   // public viewData = this.authService.permissions.includes('phlebos-view');
    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    areaCodeListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public areacodeFilter: any = '';
    statelistForDropdown: any;
    locationList: any;
    deliveredlocation: any;
    collectedLocation: any;
    totalLocation: any;


    constructor(private router: Router,
        private modalService: NgbModal,
        private phleboService: PhleboService,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService,
        private taskservice:TaskService,
        public datepipe: DatePipe,


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
    GotoRunner()
    {
    this.router.navigateByUrl(`liveview/runner-view`);
    }
    GotoTask()
    {
    this.router.navigateByUrl(`liveview`);
    }
    
    liveView(data)
    {
        this.router.navigateByUrl(`liveview/task-map/${data.id}`, {
            state: {
                form: 'view'
            }
        });
    }
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

        this.taskservice.obtainLocationLiveView(`p=${this.service.page}${cityFilter}${stateFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.locationList = data.data.data.rows;
            this.collectionSize = data.data.data.count;
            this.isLoadedTable = false;
            this.totalLocation = data.data.totalLocation;
            this.collectedLocation = data.data.collectedLocation;
            this.deliveredlocation = data.data.deliveredlocation;
          


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
        this.statusFilter = '';
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

    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }

    ngOnInit(): void {
        this.refreshLocation();
        setTimeout(() => {
            this.isLoadedTable = false;
        }, 1000);
      //  this.refreshLocation();

       
        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
          
        });

    }

    
    view(data: any) {

        this.router.navigateByUrl(`task/view-task/${data}`, {
            state: {
                form: 'view'
            }
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
