import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhleboService } from 'src/app/services/phlebo/phlebo.service';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { TaskService } from 'src/app/services/task/task.service';
import { TableModalComponent } from 'src/app/components/TableModal/TableModal.component';


@Component({
  selector: 'app-task-liveview',
  templateUrl: './task-liveview.component.html',
  styleUrls: ['./task-liveview.component.scss']
})
export class TaskLiveviewComponent implements OnInit {

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
    
    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    areaCodeListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public areacodeFilter: any = '';
    statelistForDropdown: any;
    public stateFilter: any = '';
    taskList: any;
    totalTask: any;
    ongoingTask: any;
    completedTask: any;
    cancelledTask: any;
    waitingTask: any;

    constructor(private router: Router,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService,
        private taskservice:TaskService


    ) { }

    GotoRunner()
    {
    this.router.navigateByUrl(`liveview/runner-view`);
    }
    GotoLocation()
    {
    this.router.navigateByUrl(`liveview/location-view`);
    }
    
    liveView(data)
    {
        this.router.navigateByUrl(`liveview/task-map/${data.id}`, {
            state: {
                form: 'view'
            }
        });
    }
    refreshTaskView() {
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

        this.taskservice.obtainTaskLiveView(`p=${this.service.page}${cityFilter}${stateFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
         
         console.log("amit",data);
            this.taskList = data.data.data.rows;
            this.collectionSize = data.data.data.count;
            this.isLoadedTable = false;
            this.totalTask = data.data.totalTask;
            this.ongoingTask = data.data.ongoingTask;
            this.completedTask = data.data.completedTask;
            this.cancelledTask = data.data.cancelledTask;
            this.waitingTask = data.data.waitingTask;


           

        });
    }

    onKeyEnter(event:any){
        this.refreshTaskView();
    }
    //Search Customer
    searchTask() {
        //call api
        this.refreshTaskView();

    }
    resetFilter() {
        this.cityFilter = '';

        this.stateFilter = '';
        this.statusFilter = '';
        this.searchNamefilter = '';
        this.refreshTaskView();
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
        this.refreshTaskView();
    }


    ngOnInit(): void {
        this.refreshTaskView();
        setTimeout(() => {
            this.isLoadedTable = false;
        }, 1000);
       // this.refreshTaskView();

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
   
    viewLocation(data: any) {
        const modalRef = this.modalService.open(TableModalComponent, {
            centered: true,
            size: 'lg',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: ``,
            subTitle: data.task_number,
            type: 'viewLocationDetail',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshTaskView();
        });
    }
    
    view(data: any) {

        this.router.navigateByUrl(`task/view-task/${data}`, {
            state: {
                form: 'view'
            }
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
