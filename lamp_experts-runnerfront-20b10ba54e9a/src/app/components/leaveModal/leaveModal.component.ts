import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/services/setting/setting.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { RunnerService } from 'src/app/services/runner/runner.service';


@Component({
    selector: "app-leaveModal",
    templateUrl: "./leaveModal.component.html",
    styleUrls: ["./leaveModal.component.scss"]
})
export class LeaveModalComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    public title: string;
    public subTitle: string;

    public type: string;
    public data: any;
    public page: any = 1;
    lastLoopItem: number=0;

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
    leaveTouchSubmit:  boolean=false;

    

    constructor(
        private ngbModal: NgbActiveModal,
        private toastr: ToastrService,
        private settingService: SettingService,
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private router: Router,
        public datepipe: DatePipe,
        public runnerService:RunnerService


    ) { 
       // this.userType= this.authService.user.roles[0].user_type_id;
     //   this.login_customer_id= this.authService.user.customer_id;

    }

    ngOnInit(): void {
        this.setDialogProps(this.props);

     
       
        
        this.leaveForm = this.formBuilder.group({
            client_id: ['1'],
            runner_id: [''],
           
            leaves: this.formBuilder.array([this.createLeaveInfo()]),

        });

             
        if(this.data.leaves.length>0)
        {


            const leavedata = this.leaveForm.get('leaves') as FormArray
            for (let index = 0; index < this.data.leaves.length; index++) {
                leavedata.removeAt(index)
            }
            for (let index = 0; index < this.data.leaves.length; index++) {
                if (this.data.leaves[index].leave_type != "") {
                    leavedata.push(this.createLeaveInfo())
                }
            }
            leavedata.patchValue(this.data.leaves);

        }
      
    }

    
    private createLeaveInfo(): FormGroup {
        return new FormGroup({
            'leave_type': new FormControl(' ', Validators.required),
            'from_date': new FormControl('', Validators.required),
            'to_date': new FormControl('', Validators.required),
            'is_approved': new FormControl(''),
        })
    }
    
    get leaveInfo() {
        return this.leaveForm.controls;
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
    masterAddItem() {
        const data = this.leaveForm.get('leaves') as FormArray
        if (data.controls[data.controls.length - 1].invalid) {
            return;
        } else {
            if(data.controls.length == 7){
                this.toastr.error(`You can only add 7 items max`);
            }
            if(data.controls.length <= 7){
                data.push(this.createLeaveInfo())
            }else{
                this.toastr.error(`You can only add 7 items max`);
            }
        }
        this.lastLoopItem = data.controls.length - 1;
    }
    masterRemoveItem(i: number) {
        const data = this.leaveForm.get('leaves') as FormArray
        if (data.length > 1) {
            data.removeAt(i)
        } else {
            data.reset()
        }
        this.lastLoopItem = data.controls.length - 1;
    }

 

    onSaveLeave() {

           switch (this.type) {
              
               case 'viewLeave':
               this.leaveTouchSubmit=true;  
                   if (this.leaveForm) {
   
                      this.leaveForm.get('runner_id').setValue(this.data.id);
                      console.log("padam----------------",this.leaveForm.value)

                       this.showError = false;
                       this.isBtnLoaded = true;
   
                           this.runnerService.onSaveLeave(this.leaveForm.value).subscribe(
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
                                   this.leaveTouchSubmit=false;  
                               }
                           );
   
                      
                   } else {
                       this.showError = true;
                       this.leaveTouchSubmit=false;  
                   }
                   break;
               
           }
       }
    
}
