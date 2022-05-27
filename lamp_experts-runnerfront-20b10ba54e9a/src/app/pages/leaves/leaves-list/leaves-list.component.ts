import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { SettingService } from 'src/app/services/setting/setting.service';
import { LeavesAddComponent } from '../leaves-add/leaves-add.component';

@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.scss']
})
export class LeavesListComponent implements OnInit {

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


    public searchNamefilter: any; //filter to search name

    public LeavesLists: any = [];

    public isLoadedTable: boolean = true;
    public toDateFilter: any;
    public DateFilter: any;
    runnerlistForDropdown: any;
    clientId: any=1;
    public runner_id:any='';
    constructor(
        private settingService: SettingService,
        private modalService: NgbModal,
        private leaveService: LeaveService,
       private runnerService:RunnerService,
       public datepipe: DatePipe,
       private toastr: ToastrService,


    ) { }

    refreshLeave() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sort=${this.sortDirection}`;
        let filtersortColumn = `&sort_by=${this.sortColumn}`;

        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';
        let runner = this.runner_id ? `&runner=${this.runner_id}` : '';

        let formatedDate = this.datepipe.transform(this.DateFilter, 'yyyy-MM-dd');


        let from_date = formatedDate ? `&date=${formatedDate}` : '';



        this.leaveService.getallLeave(`p=${this.service.page}${searchbox}${filtersortColumn}${short}${runner}${from_date}`).subscribe((data) => {
            this.LeavesLists = data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;

        });
    }

    onEnterPress(name:string){
        console.log(name);
        this.refreshLeave();
    }

    //Search Customer
    searchLeave() {
        //call api
        this.refreshLeave();
    }

    resetFilter() {
        this.searchNamefilter = '';
        this.DateFilter = '';
        this.runner_id = '';
        this.refreshLeave();
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
        this.refreshLeave();
    }


    ngOnInit() {
        this.runnerService.getRunnerByclientId(this.clientId).subscribe((data) => {
            this.runnerlistForDropdown = data.data;
          
        });
        this.refreshLeave();
    }

    add() {
      
        const modalRef = this.modalService.open(LeavesAddComponent, {
            centered: true,
            size: 'sm',
        });
        modalRef.componentInstance.props = {
            title: 'Add Leave',
            type: 'addLeave',
          
            page: `page=${this.service.page}`,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshLeave();
        })
    }
    edit(data: any) {
      
        const modalRef = this.modalService.open(LeavesAddComponent, {
            centered: true,
            size: 'sm',
        });
        modalRef.componentInstance.props = {
            title: 'Edit Leave',
            type: 'EditLeave',
            data: data,
            page: `page=${this.service.page}`,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshLeave();
        })
    }
    delete(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this Leave?`,
            subTitle: ``,
            type: 'deleteLeave',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshLeave();
        });
    }
    updateStatus(id: any, status: any) {
        this.leaveService.updateStatus(id, status).subscribe((res) => {
            if (res.sucess) {
                this.toastr.success(`${res.message}`);
                this.refreshLeave();
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
