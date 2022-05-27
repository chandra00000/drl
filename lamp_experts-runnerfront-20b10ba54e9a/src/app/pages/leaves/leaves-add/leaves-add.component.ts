import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cityService } from 'src/app/services/city/city.service';
import { SettingService } from 'src/app/services/setting/setting.service';
import { LocationService } from 'src/app/services/location/location.service';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { LeaveService } from 'src/app/services/leave/leave.service';
declare const google: any;

@Component({
  selector: 'app-leaves-add',
  templateUrl: './leaves-add.component.html',
  styleUrls: ['./leaves-add.component.scss']
})
export class LeavesAddComponent implements OnInit {

    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    //Props
    public title: string;
    public type: string;
    public data: any;
    public pages: any;
    public editId: any

    //Loader
    public isBtnLoaded: boolean = false;

    //From Group
    public leaveForm: FormGroup;

    //Dropdown List
    public statelistForDropdown = [];
    public citylistForDropdownByState = [];
    public citylistForDropdown = [];
  clientId: any=1;
  runnerlistForDropdown: any;
public leaveTouchSubmit: boolean=false;

    constructor(
        private ngbModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private cityService: cityService,
        private toastr: ToastrService,
        private settingService: SettingService,
        private locationService: LocationService,
        private runnerService:RunnerService,
        private leaveService:LeaveService
    ) { }

    ngOnInit(): void {
      //  this.cityService.getallstateandId().subscribe((data) => {
      //      this.statelistForDropdown = data.states;
       // });
        this.runnerService.getRunnerByclientId(this.clientId).subscribe((data) => {
          this.runnerlistForDropdown = data.data;
        
      });
       
        this.leaveForm = this.formBuilder.group({
           
       
            runner_id: ['', Validators.required],
            leave_type: ['', Validators.required],          
            from_date: ['', Validators.required],       
            to_date: ['', Validators.required],
            client_id: ['1'],
        });
        
        this.setDialogProps(this.props);
    }
    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }

    getCities_data(event)
    {
        this.cityService.getallCitysandbyId(event).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }
    
    get leaveInfo() {
        return this.leaveForm.controls;
    }
  
    omit_special_char(event) {
        var k;
        k = event.charCode; //         k = event.keyCode;  (Both can be used)
        return (
            (k > 64 && k < 91) ||
            (k > 96 && k < 123) ||
            k == 8 ||
            k == 32 ||
            (k >= 48 && k <= 57)
        );
    }

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.pages = dialogdata.page;
        if (['EditLeave'].includes(this.type)) {
            this.editId = this.data.id;
            console.log("padam",this.data);
            this.leaveForm.patchValue(this.data);
       
        }
    }
   
    closeModal() {
        this.passEntry.next(this.pages);
        this.ngbModal.close();
    }

    create() {
        if (this.leaveForm.valid) {

            this.isBtnLoaded = true;
            this.leaveService.createLeave(this.leaveForm.value).subscribe((res: any) => {
                if (res.success) {
                    this.toastr.success(`${res.message}`);
                } else {
                    if (res.message) {
                        this.toastr.error(`${res.message}`);
                    } else {
                        this.toastr.error(`Added Successfully`);
                    }
                }
            },
            (err: any) => {
                this.toastr.error(`${err}`);
            },
            () => {
                this.closeModal();
                this.isBtnLoaded = false;
            })
        }
        else {
            this.leaveForm.markAllAsTouched();
        }
    }

    edit() {
        if (this.leaveForm.valid) {
            this.isBtnLoaded = true;
            this.leaveService.updateLeave(this.leaveForm.value, this.editId).subscribe((res: any) => {
                if (res.success) {
                    this.toastr.success(`${res.message}`);
                } else {
                    if (res.message) {
                        this.toastr.error(`${res.message}`);
                    } else {
                        this.toastr.error('Not Edited Successfully');
                    }
                }
            },
            (err: any) => {
                this.toastr.error(`${err}`);
            },
            () => {
                this.closeModal();
                this.isBtnLoaded = false;
            })
        }
        else {
            this.leaveForm.markAllAsTouched();
        }
    }
}
