import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhleboService } from 'src/app/services/phlebo/phlebo.service';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-runner-liveview',
  templateUrl: './runner-liveview.component.html',
  styleUrls: ['./runner-liveview.component.scss']
})
export class RunnerLiveviewComponent implements OnInit {

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
    public stateFilter: any = '';
    public isLoadedTable: boolean = true;
    public id: any;
    public phleboList: any = [];
    public phleboFilter: any = '';
    public statusFilter: any = '';
    public roleFilter: any = '';
    public sortDirection: any = 'desc';
    public sortColumn: any = 'created_at';
    //public addData = this.authService.permissions.includes('phlebos-create');
    //public editData = this.authService.permissions.includes('phlebos-edit');
    //public deleteData = this.authService.permissions.includes('phlebos-delete');

    //public viewData = this.authService.permissions.includes('phlebos-view');
    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    areaCodeListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public areacodeFilter: any = '';
    statelistForDropdown: any;
    totalActiveRunner: any;
    assignedRunner: any;
    deleveringRunner: any;
    runnerList: any;


    constructor(private router: Router,
        private modalService: NgbModal,
        private phleboService: PhleboService,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService,
        private taskservice:TaskService

    ) { }

    GotoTask()
    {
    this.router.navigateByUrl(`liveview`);
    }

    GotoLocation()
    {
    this.router.navigateByUrl(`liveview/location-view`);
    }

    
    liveView(data)
    {
        this.router.navigateByUrl(`liveview/runner-map/${data.id}`, {
            state: {
                form: 'view'
            }
        });
    }
    refreshRunner() {
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

        this.taskservice.obtainRunnersLiveView(`p=${this.service.page}${cityFilter}${stateFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.runnerList = data.data.data.rows;
            this.collectionSize = data.data.data.count;
            this.isLoadedTable = false;
            this.totalActiveRunner = data.data.totalActiveRunner;
            this.assignedRunner = data.data.assignedRunner;
            this.deleveringRunner = data.data.deleveringRunner;
          

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
        this.statusFilter = '';
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

    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }
    view(data: any) {

        this.router.navigateByUrl(`task/view-task/${data}`, {
            state: {
                form: 'view'
            }
        });
    }
    ngOnInit(): void {
        this.refreshRunner();
        setTimeout(() => {
            this.isLoadedTable = false;
        }, 1000);
        //this.refreshRunner();

        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
          
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
