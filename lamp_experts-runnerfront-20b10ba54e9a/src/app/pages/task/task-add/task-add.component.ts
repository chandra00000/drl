import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cityService } from '../../../services/city/city.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Selectr from 'mobius1-selectr';
import { TaskService } from 'src/app/services/Task/Task.service';
import { LocationService } from 'src/app/services/location/location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationAddComponent } from '../../location/location-add/location-add.component';
import { LocationModalComponent } from 'src/app/components/locationModal/locationModal.component';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { TourService } from 'src/app/services/Tour/Tour.service';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { LocalStorageService } from 'src/app/storage/local-storage.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

    public isEdit: boolean;
    public userId: any;
    citylistForDropdown: any;

    public TaskTouchSubmit = false;
    public nextSaveBtnLoding = false;
    public addTaskForm!: FormGroup;
    public Taskdata = { first_name: '' };

    public statelistForDropdown = [];
    public citylistForDropdownByState = [];
    public areacodelistForDropdown = [];
    displayNotEditedDateTime: any;
    selectrSingle: any;

    optionsSingle = {
        placeholder: 'Select Task',
        // data: []
    };
    existTaskHide: boolean;
    checkExisit: boolean=true;
    riderID: any;
    lastLoopItem: number=0;
    isChecked: boolean;
    isCheckedName: any;
    locationlistForDropdown: any;
  TaskTypeRadio: string='ondemand';
  runnerlistForDropdown: any;
    public clientId: any=1;
    tourlistForDropdown: any;
    partnerlistForDropdown: any;
    tourLocationlistForDropdown: any=[];
    today=new Date();

    constructor(
        private formBuilder: FormBuilder,
        private cityService: cityService,
        private taskService: TaskService,
        private toastr: ToastrService,
        private router: Router,
        public datepipe: DatePipe,
        private actRoute: ActivatedRoute,
        private locationService:LocationService,
        private modalService: NgbModal,
        private runnerService:RunnerService,
        private tourService: TourService,
        private partnerService:PartnerService ,

    ) { 

        this.actRoute.paramMap.subscribe(params => {
            this.userId = params.get('id');
            this.checkExisit =false;
        });
    }

    ngOnInit(): void {
       
        
      
        this.cityService.getallcityandId().subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
          
        });
        this.locationService.getLocationList().subscribe((data) => {
            this.locationlistForDropdown = data.data.rows;
          
        });
        this.runnerService.getRunnerByclientId(this.clientId).subscribe((data) => {
          this.runnerlistForDropdown = data.data;
        
      });
      this.tourService.getTourByClientId(this.clientId).subscribe((data) => {
        this.tourlistForDropdown = data.data;
      
    });
   
        
        this.addTaskForm = this.formBuilder.group({
            client_id: [this.clientId],
            task_type: ['scheduled'],
         //   task_number: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]{6,}")]],
            task_number: [''],
            runner_id: [''],
            tour_id: [''],
            city_id: ['',Validators.required],
            date: [''],
           
            location: this.formBuilder.array([this.createLocationInfo()]),

        });
        
        
        
        
        
        
        
        
        

        if (this.userId) {
            this.isEdit = true;
            this.checkExisit=false;
           this.taskService.obtainTask(this.userId).subscribe((data) => {
             
              this.addTaskForm.patchValue(data.data);


              const locationdata = this.addTaskForm.get('location') as FormArray
              for (let index = 1; index < locationdata.controls.length; index++) {
                locationdata.removeAt(index)
              }
              for (let index = 1; index < data.data.task_locations.length; index++) {
                  if (data.data.task_locations[index].location_address != "") {
                    locationdata.push(this.createLocationInfo())
                  }
              }
              locationdata.patchValue(data.data.task_locations);
              this.getTourLocationEdit(data.data.tour_id);

            });
        }else{
            this.checkExisit=true;
      
        }
    }
    client_id(client_id: any) {
        throw new Error('Method not implemented.');
    }

    private createLocationInfo(): FormGroup {
        return new FormGroup({
            //'location_address': new FormControl('', Validators.required),
           // 'scheduled_time': new FormControl('', Validators.required),  
             'location_address': new FormControl(''),
            'scheduled_time': new FormControl(''),          
            'start_point': new FormControl(''),
            'end_point': new FormControl(''),
           
        })
    }
    onChange(e){    

        this.isChecked =false;
        this.isCheckedName = e.target.name;
        console.log("aman",e.target.name);  
    }
  
    getCitynamebystate(state_id: number) {
        this.cityService.getallCitysandbyId(1).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
    }
  
    getTourLocation(event)
    {
        
        this.tourService.getTourLocationBytourId(event.target.value).subscribe((data) => {
            this.tourLocationlistForDropdown = data.data.rows;
        });
   
  
    }
    getTourLocationEdit(data:any)
    {
        
        this.tourService.getTourLocationBytourId(data).subscribe((data) => {
            this.tourLocationlistForDropdown = data.data.rows;
        });
   
  
    }

    addTask() {
        console.log("padam",this.addTaskForm.value);
        this.TaskTouchSubmit = true;
        console.log("padam111",this.addTaskForm.valid);


        if (this.addTaskForm.valid) {
           
            console.log("amit");
            this.taskService.addTask(this.addTaskForm.value).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Task added Successfully");
                        this.router.navigate(['task']);
                    } else {
                        
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Task Not Added Successfully`);
                        }
                    }
                },
                (err: any) => {
                    this.toastr.error(`${err}`);
                    console.log(err);
                },
                () => {
                    this.nextSaveBtnLoding = false;
                    this.TaskTouchSubmit = false;
                }
            );

        }

    }

  /*  checkExistTask(event) {

        if (event.target.checked) {
            this.getTask();

          this.existTaskHide=true; 
          this.addTaskForm.get('rider_id').setValidators([Validators.required]);
          this.addTaskForm.get('rider_id').updateValueAndValidity();
        

        } else {
           this.selectrSingle.removeAll();

            this.existTaskHide=false;
            this.addTaskForm.get('rider_id').clearValidators();
            this.addTaskForm.get('rider_id').updateValueAndValidity();
          
        }

    }
*/

editTask() {
        console.log("amit",this.addTaskForm.value);
        this.TaskTouchSubmit = true;
        if (this.addTaskForm.valid) {
            this.nextSaveBtnLoding = true;
        
            this.taskService.editTask(this.addTaskForm.value, this.userId).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Task Updated Successfully");
                        this.router.navigate(['task']);

                    } else {
                        if (res.message) {
                            this.nextSaveBtnLoding = false;
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Task Not Added Successfully`);
                        }
                    }
                },
                (err: any) => {
                    this.toastr.error(`${err}`);
                    console.log(err);
                },
                () => {
                    this.nextSaveBtnLoding = false;
                    this.TaskTouchSubmit = false;
                }
            );
            }
    }

    get TaskInfo() {
        return this.addTaskForm.controls;
    }
    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }
    addLocation() {
      
      const modalRef = this.modalService.open(LocationModalComponent, {
          centered: true,
          size: 'sm',
      });
      modalRef.componentInstance.props = {
          title: 'Add Location',
          type: 'add',          
       // page: `page=${this.service.page}`,
      };
      modalRef.componentInstance.passEntry.subscribe((res: any) => {
          console.log("padam");
          window.location.reload();
        //  this.refreshLocation();
      })
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

    GoBack() {
        this.router.navigateByUrl('/task');
    }
    
 
    TaskTypeChange() {
        console.log("padam1111");
  
        this.TaskTypeRadio = this.TaskInfo.task_type.value;
        if (this.userId) {
            if (this.TaskTypeRadio == 'ondemand') {
           
                this.router.navigateByUrl('task/edit-task-ondemand/' + this.userId, {
                  state: {
                      form: 'edit'
                  }
              });;
      
               
               
            } else {
             
           
            this.router.navigateByUrl('task/edit-task/' + this.userId, {
                state: {
                    form: 'edit'
                }
            });;  
             
            }
        }else{
        if (this.TaskTypeRadio == 'ondemand') {
          this.router.navigateByUrl('task/add-task-ondemand', {
            state: {
                form: 'add'
            }
        });;
           
           
        } else {
          this.router.navigateByUrl('task/add-task', {
            state: {
                form: 'add'
            }
        });;
         
        }
    }
        console.log(this.TaskTypeRadio);
    }
  

}
