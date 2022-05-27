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
  selector: 'app-task-add-ondemand',
  templateUrl: './task-add-ondemand.component.html',
  styleUrls: ['./task-add-ondemand.component.scss']
})
export class TaskAddOndemandComponent implements OnInit {

    today=new Date();

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

    ngOnInit(): void {
       
      //this.taskID= this.localStorageService.getTaskId();
      

      this.cityService.getallcityandId().subscribe((data) => {
        this.citylistForDropdown = data.data.rows;
      
    });
      this.runnerService.getRunnerByclientId(this.clientId).subscribe((data) => {
        this.runnerlistForDropdown = data.data;
      
    });
      
        this.locationService.getLocationList().subscribe((data) => {
            this.locationlistForDropdown = data.data.rows;
          
        });
     
      
        this.addTaskForm = this.formBuilder.group({
          client_id: [this.clientId],
          task_type: ['ondemand'],
       //   task_number: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]{6,}")]],
          task_number: [''],
          runner_id: [''],
          city_id: ['',Validators.required],
          date: ['',Validators.required],
        

      });
        this.addLocationForm = this.formBuilder.group({
            client_id: ['1'],
             task_id: [''],
            'location_address': new FormControl('', Validators.required),
            'scheduled_time': new FormControl('', Validators.required),          
          //  location: this.formBuilder.array([this.createLocationInfo()]),

        });


        

        if (this.userId) {
            this.isEdit = true;
            this.checkExisit=false;
            this.taskID=this.userId;
            this.getTaskLocationData( this.userId);
            this.TaskService.obtainTask(this.userId).subscribe((data) => {
                
               // this.getCitynamebystate(data.data.state_id)

              //  this.addTaskForm.get('serving_city').setValue(data.data.serving_city);
              this.addTaskForm.patchValue(data.data);

            });
        }else{
            this.checkExisit=true;
      
        }
 var optionsMultipleLocation = {
            multiple: false,
            placeholder: 'Select Location',
            data: [{ value: 'all', text: 'All' }],
           
          };
           var selectrmultiple: any = document.getElementById(
            'selectr-multiple-location',
          );         
           this.selectorMultiple = new Selectr(selectrmultiple, optionsMultipleLocation);
           this.getAllLocation()
    }

  getAllLocation()
    {         

        this.TourService.getTourLocation(1).subscribe((data) => {
            
     this.selectorMultiple.removeAll();
      var thisData=[];
       data.data.forEach((item) => {
        
        thisData.push({ value: item.location_name, text: item.location_name+" - "+item.address+" - "+"("+item.location_code+") " });
         
       });
       this.selectorMultiple.add(thisData);
     });
    }
    onChange(e){    

        this.isChecked =false;
        this.isCheckedName = e.target.name;
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
    addTask() {
        this.TaskTouchSubmit = true;

        if (this.addTaskForm.valid) {
            this.nextSaveBtnLoding = true;
           

            this.TaskService.addTaskOndemand(this.addTaskForm.value).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Task added Successfully");
                       // this.localStorageService.addTaskId(res.data.id);
                       //  this.getTaskLocationData(res.data.id);
                      //  this.router.navigate(['task/add-task-ondemand']);
                   //   this.router.navigateByUrl('/task/edit-task-ondemand/');
                   this.router.navigate(['/task/edit-task-ondemand/'+res.data.id])
                   .then(() => {
                    window.location.reload();
                   });

                   } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Tour Not Added Successfully`);
                        }
                    }
                },
                (err: any) => {
                    this.toastr.error(`${err}`);
                },
                () => {
                    this.nextSaveBtnLoding = false;
                    this.TaskTouchSubmit = false;
                }
            );

        }

    }

    addLocation() {
        this.LocationTouchSubmit = true;

        if (this.addLocationForm.valid) {
            this.nextSaveBtnLoding_location = true;
          // if(this.userId){
          this.addLocationForm.get('task_id').setValue(this.userId);
           
            this.TaskService.addTaskLocation(this.addLocationForm.value).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Location added to task Successfully");
                        this.selectorMultiple.reset();
                        this.addLocationForm.reset()

                        this.getTaskLocationData( this.userId);
                        this.router.navigate(['task/edit-task-ondemand/'+this.userId]);
                       
                    } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Tour Not Added Successfully`);
                        }
                    }
                },
                (err: any) => {
                    this.toastr.error(`${err}`);
                    console.log(err);
                },
                () => {
                    this.nextSaveBtnLoding_location = false;
                    this.LocationTouchSubmit = false;
                }
            );

        }

    }
  /*  checkExistTour(event) {

        if (event.target.checked) {
            this.getTour();

          this.existTourHide=true; 
          this.addTaskForm.get('rider_id').setValidators([Validators.required]);
          this.addTaskForm.get('rider_id').updateValueAndValidity();
        

        } else {
           this.selectrSingle.removeAll();

            this.existTourHide=false;
            this.addTaskForm.get('rider_id').clearValidators();
            this.addTaskForm.get('rider_id').updateValueAndValidity();
          
        }

    }
*/

editTask() {
        this.TaskTouchSubmit = true;
        if (this.addTaskForm.valid) {
            this.nextSaveBtnLoding = true;
        
            this.TaskService.editTask(this.addTaskForm.value, this.userId).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Task Updated Successfully");
                       
                        this.getTaskLocationData( this.userId);
                        this.router.navigate(['task/edit-task-ondemand/'+this.userId]);
                       
                    } else {
                        if (res.message) {
                            this.nextSaveBtnLoding = false;
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Phbelo Not Added Successfully`);
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
        get LocationInfo() {
            return this.addLocationForm.controls;
        }
    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
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
        
        this.localStorageService.clearTaskId();
        this.router.navigateByUrl('/task');
    }
    delete(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this Location?`,
            subTitle: ``,
            type: 'deleteTaskLocaion',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
           
            this.getTaskLocationData( this.userId);
            this.router.navigate(['task/edit-task-ondemand/'+this.userId]);
          
        });
    }
    makeStart(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Make it start point?`,
            subTitle: ``,
            type: 'makeStartTaskLocaion',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
      
                        this.getTaskLocationData( this.userId);
                        this.router.navigate(['task/task-edit-ondemand/'+this.userId]);
                       
        });
    }  
    makeEnd(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Make it end point?`,
            subTitle: ``,
            type: 'makeEndTaskLocaion',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
          
            this.getTaskLocationData( this.userId);
            this.router.navigate(['task/task-edit-ondemand/'+this.userId]);
           
        });
    }

    TaskTypeChange() {

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
  }

}
