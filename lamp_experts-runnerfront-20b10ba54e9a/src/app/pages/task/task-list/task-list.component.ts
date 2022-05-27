import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { TaskService } from 'src/app/services/task/task.service';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { EnterModalComponent } from 'src/app/components/enterModal/enterModal.component';
import { TableModalComponent } from 'src/app/components/TableModal/TableModal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

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
    public taskList: any = [];
    public taskFilter: any = '';
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
    stateFilter: any= '';;

    constructor(private router: Router,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService,
        private taskservice:TaskService

    ) { }


    refreshTask() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sort=${this.sortDirection}`;
        let filtersortColumn = `&sort_by=${this.sortColumn}`;

        // s=Agraa&serving_area_code=38&p=1&sort_by=&sort=asc&limit=15
        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';

        let cityFilter = this.cityFilter ? `&serving_city=${this.cityFilter}` : '';
        let statusFilter = this.statusFilter ? `&status=${this.statusFilter}` : '';

        this.taskservice.obtainTasks(`p=${this.service.page}${cityFilter}${statusFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.taskList = data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;


        });
    }
    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }

    onKeyEnter(event:any){
        this.refreshTask();
    }
    //Search Customer
    searchtasks() {
        //call api
        this.refreshTask();

    }
    resetFilter() {
        this.cityFilter = '';
        this.areacodeFilter = '';
        this.statusFilter = '';
        this.searchNamefilter = '';
        this.refreshTask();
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
        this.refreshTask();
    }


    ngOnInit(): void {
        this.refreshTask();
       

        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
          
        });

    }

    addTask() {
        this.router.navigateByUrl('task/add-task-ondemand', {
            state: {
                form: 'add'
            }
        });
    }
    editTaskData(data: any) {
        if(data.task_type=='ondemand')
        {
            const url =
            this.router.navigateByUrl('task/edit-task-ondemand/' + data.id, {
                state: {
                    form: 'edit'
                }
            });;
        }
        if(data.task_type=='scheduled')
        {
            const url =
            this.router.navigateByUrl('task/edit-task/' + data.id, {
                state: {
                    form: 'edit'
                }
            });;  
        }
        

        

    }

    
    view(data: any) {

        this.router.navigateByUrl(`task/view-task/${data.id}`, {
            state: {
                form: 'view'
            }
        });
    }
    updateStatus(id: any, status: any) {
        this.taskservice.updateStatus(id, status).subscribe((res) => {
            if (res.sucess) {
                this.toastr.success(`${res.message}`);
                this.refreshTask();
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
    


    
    viewTask(data: any) {
        const modalRef = this.modalService.open(TableModalComponent, {
            centered: true,
            size: 'md',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Task Detail`,
            subTitle: data.task_number,
            type: 'viewTaskDetail',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshTask();
        });
    }
    assignTask(data: any) {
        const modalRef = this.modalService.open(EnterModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Assign this Task?`,
            subTitle: data.task_number,
            type: 'assignTask',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshTask();
        });
    }
    deleteTask(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this Task?`,
            subTitle: data.task_number,
            type: 'deleteTask',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshTask();
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
            this.refreshTask();
        });
    }
    

}
