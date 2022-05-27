import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/services/setting/setting.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { TaskService } from 'src/app/services/task/task.service';


@Component({
    selector: "app-enterModal",
    templateUrl: "./enterModal.component.html",
    styleUrls: ["./enterModal.component.scss"]
})
export class EnterModalComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    public title: string;
    public subTitle: string;

    public type: string;
    public data: any;
    public page: any = 1;

    public isBtnLoaded: boolean = false;
    gfg1 = {hour: 15, minute: 58};

    customer_id: any
    showError: boolean;
    userType: any;
    login_customer_id: any;
    public declineForm: FormGroup;
    cancellForm: FormGroup;
    reasonDropDown: any;
    inputtype: string;
    public collectedDate :any;
    public collectedTime :any;
    mydate: string;
    checkdate: number;
  
    leaveForm: FormGroup;
    rosterForm: FormGroup;
    assignForm: FormGroup;
    rosterTouchSubmit: boolean=false;
    clientId: any=1;
    runnerlistForDropdown: any;
    assignTaskTouchSubmit: boolean=false;

    

    constructor(
        private ngbModal: NgbActiveModal,
        private toastr: ToastrService,
        private settingService: SettingService,
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private router: Router,
        public datepipe: DatePipe,
        public runnerService:RunnerService,
        public taskService:TaskService


    ) { 
       // this.userType= this.authService.user.roles[0].user_type_id;
     //   this.login_customer_id= this.authService.user.customer_id;

    }

    ngOnInit(): void {
        this.setDialogProps(this.props);
        this.runnerService.getRunnerByclientId(this.clientId).subscribe((data) => {
            this.runnerlistForDropdown = data.data;
          
        });
        this.assignForm = this.formBuilder.group({
            client_id:['1'],
            runner_id:[' ',Validators.required],
           
           
        });
        
        this.rosterForm = this.formBuilder.group({
            client_id:['1'],
            runner_id:[''],
            check_mon: [''],
            start_mon:[''],
            end_mon:[''],
            check_tue: [''],
            start_tue:[''],
            end_tue:[''],
            check_wed: [''],
            start_wed:[''],
            end_wed:[''],
            check_thu: [''],
            start_thu:[''],
            end_thu:[''],
            check_fri: [''],
            start_fri:[''],
            end_fri:[''],
            check_sat: [''],
            start_sat:[''],
            end_sat:[''],
            check_sun: [''],
            start_sun:[''],
            end_sun:[''],
           
        });
        if(this.data.rosters)
        {
        if(this.data.rosters.length>0)
        {
            for (let index = 0; index <this.data.rosters.length; index++) {
                
           
            if(this.data.rosters[index].day=="mon")
            {
            this.rosterForm.get('check_mon').setValue(true); 
            this.rosterForm.get('start_mon').setValue(this.data.rosters[index].start_time);
            this.rosterForm.get('end_mon').setValue(this.data.rosters[index].end_time);  
            } 
            if(this.data.rosters[index].day=="tue")
            {
            this.rosterForm.get('check_tue').setValue(true); 
            this.rosterForm.get('start_tue').setValue(this.data.rosters[index].start_time);
            this.rosterForm.get('end_tue').setValue(this.data.rosters[index].end_time);  
            } 
            if(this.data.rosters[index].day=="wed")
            {
            this.rosterForm.get('check_wed').setValue(true); 
            this.rosterForm.get('start_wed').setValue(this.data.rosters[index].start_time);
            this.rosterForm.get('end_wed').setValue(this.data.rosters[index].end_time);  
            } 
            if(this.data.rosters[index].day=="thu")
            {
            this.rosterForm.get('check_thu').setValue(true); 
            this.rosterForm.get('start_thu').setValue(this.data.rosters[index].start_time);
            this.rosterForm.get('end_thu').setValue(this.data.rosters[index].end_time);  
            } 
            if(this.data.rosters[index].day=="fri")
            {
            this.rosterForm.get('check_fri').setValue(true); 
            this.rosterForm.get('start_fri').setValue(this.data.rosters[index].start_time);
            this.rosterForm.get('end_fri').setValue(this.data.rosters[index].end_time);  
            } 
            if(this.data.rosters[index].day=="sat")
            {
            this.rosterForm.get('check_sat').setValue(true); 
            this.rosterForm.get('start_sat').setValue(this.data.rosters[index].start_time);
            this.rosterForm.get('end_sat').setValue(this.data.rosters[index].end_time);  
            } 
            if(this.data.rosters[index].day=="sun")
            {
            this.rosterForm.get('check_sun').setValue(true); 
            this.rosterForm.get('start_sun').setValue(this.data.rosters[index].start_time);
            this.rosterForm.get('end_sun').setValue(this.data.rosters[index].end_time);  
            } 
        } 
        }
    }
        
        console.log("paddakloo",this.data);
    }
    
    get assignInfo() {
        return this.assignForm.controls;
    }
    get rosterInfo() {
        return this.rosterForm.controls;
    }
    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.subTitle = dialogdata.subTitle;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.page = dialogdata.page;
        
    }

    onClose() {
        this.passEntry.next(this.page);
        this.ngbModal.close();
    }
    onCloseNext() {
     
        this.passEntry.next(this.page);
        this.ngbModal.close();
    }
    
    
    onAssignTask() {

        switch (this.type) {
           
            case 'assignTask':
           
            this.assignTaskTouchSubmit=true;  
                if (this.assignForm) {

                 var  runnerid= this.assignForm.get('runner_id').value;


                    this.showError = false;
                    this.isBtnLoaded = true;
                        this.taskService.onAssignTask(this.data.id,runnerid).subscribe(
                            (res: any) => {
                                if (res && res.success) {
                                    this.toastr.success(`${res.message}`);
                                    this.onCloseNext();
                                } else {
                                    if (res.message) {
                                        this.toastr.error(`${res.message}`);
                                    } else {
                                        this.toastr.error(`submit failed`);
                                    }
                                }
                                this.isBtnLoaded = false;
                            },
                            (err: any) => {
                                this.onClose();
                                this.toastr.error(`${err.statusText}`);
                                console.log(err);
                                this.assignTaskTouchSubmit=false;  
                            }
                        );

                   
                } else {
                    this.showError = true;
                    this.assignTaskTouchSubmit=false;  
                }
                break;
            
        }
    }
 
    onSaveRoster() {

           switch (this.type) {
              
               case 'viewRoster':
              
               this.rosterTouchSubmit=true;  
                   if (this.rosterForm) {
   
                      this.rosterForm.get('runner_id').setValue(this.data.id);
   
                       this.showError = false;
                       this.isBtnLoaded = true;
                       console.log("padam11",this.data.id)
                           this.runnerService.onSaveRoster(this.rosterForm.value,this.data.id).subscribe(
                               (res: any) => {
                                   if (res && res.success) {
                                       this.toastr.success(`${res.message}`);
                                       this.onCloseNext();
                                   } else {
                                       if (res.message) {
                                           this.toastr.error(`${res.message}`);
                                       } else {
                                           this.toastr.error(`submit failed`);
                                       }
                                   }
                                   this.isBtnLoaded = false;
                               },
                               (err: any) => {
                                   this.onClose();
                                   this.toastr.error(`${err.statusText}`);
                                   console.log(err);
                                   this.rosterTouchSubmit=false;  
                               }
                           );
   
                      
                   } else {
                       this.showError = true;
                       this.rosterTouchSubmit=false;  
                   }
                   break;
               
           }
       }
    
}
