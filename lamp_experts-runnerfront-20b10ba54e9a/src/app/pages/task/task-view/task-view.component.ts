import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cityService } from '../../../services/city/city.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Selectr from 'mobius1-selectr';
import { TourService } from 'src/app/services/Tour/Tour.service';
import { LocationService } from 'src/app/services/location/location.service';
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

    public isEdit: boolean;
    public userId: any;
    citylistForDropdown: any;
    selectorMultiple: Selectr;

    public TaskTouchSubmit = false;
    public nextSaveBtnLoding = false;
    public nextSaveBtnLoding_location = false;

    public TaskTypeRadio: string='ondemand';

    public addTaskForm!: FormGroup;
    public addLocationForm!: FormGroup;

    
    public Tourdata = { first_name: '' };

    public statelistForDropdown = [];
    public citylistForDropdownByState = [];
    public areacodelistForDropdown = [];
    displayNotEditedDateTime: any;
    selectrSingle: any;
    public taskID : any;

    optionsSingle = {
        placeholder: 'Select Tour',
        // data: []
    };
    existTourHide: boolean;
    checkExisit: boolean=true;
    riderID: any;
    lastLoopItem: number=0;
    isChecked: boolean;
    isCheckedName: any;
    locationlistForDropdown: any;
    client_id: any=1;
    LocationTouchSubmit: boolean=false;
    tourLocationlist: any;
  clientId: any=1;
  runnerlistForDropdown: any;
  taskLocationlist: any;
  viewTaskDetail: any;
    
    constructor(
        private formBuilder: FormBuilder,
        private cityService: cityService,
        private TourService: TourService,
        private TaskService: TaskService,
        private toastr: ToastrService,
        private router: Router,
        public datepipe: DatePipe,
        private actRoute: ActivatedRoute,
        private locationService:LocationService,
        private localStorageService:LocalStorageService,
        private modalService: NgbModal,
        private runnerService:RunnerService


    ) { 

        this.actRoute.paramMap.subscribe(params => {
            this.userId = params.get('id');
            this.checkExisit =false;
        });
    }

    ngOnInit(): void { this.TaskService.obtainTask(this.userId).subscribe(
      (res: any) => {
        this.viewTaskDetail = res.data;

      });
    }
    onChange(e){    

        this.isChecked =false;
        this.isCheckedName = e.target.name;
        console.log("aman",e.target.name);  
    }
   

    getCitynamebystate(state_id: number) {
        this.cityService.getallCitysandbyId(state_id).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
    }

    getTaskLocationData(data:any)
    {
        
        this.TaskService.obtainTask(data).subscribe((data) => {
            this.taskLocationlist = data.data;
        });
   
  
    }


   
 
    view(data: any) {

        this.router.navigateByUrl(`task/view-task/${data.id}`, {
            state: {
                form: 'view'
            }
        });
    }
    GoBack() {
        
        this.router.navigateByUrl('/task');
    }
 

}
