import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cityService } from '../../../services/city/city.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Selectr from 'mobius1-selectr';
import { RunnerService } from 'src/app/services/runner/runner.service';

@Component({
  selector: 'app-runner-add',
  templateUrl: './runner-add.component.html',
  styleUrls: ['./runner-add.component.scss']
})
export class RunnerAddComponent implements OnInit {
    public isEdit: boolean;
    public userId: any;
    citylistForDropdown: any;

    public RunnerTouchSubmit = false;
    public nextSaveBtnLoding = false;
    public addRunnerForm!: FormGroup;
    public Runnerdata = { first_name: '' };

    public statelistForDropdown = [];
    public citylistForDropdownByState = [];
    public areacodelistForDropdown = [];
    displayNotEditedDateTime: any;
    selectrSingle: any;

    optionsSingle = {
        placeholder: 'Select Runner',
        // data: []
    };
    existRunnerHide: boolean;
    checkExisit: boolean=true;
    riderID: any;
    selectorMultiple: Selectr;

    constructor(
        private formBuilder: FormBuilder,
        private cityService: cityService,
        private RunnerService: RunnerService,
        private toastr: ToastrService,
        private router: Router,
        public datepipe: DatePipe,
        private actRoute: ActivatedRoute
    ) { 

        this.actRoute.paramMap.subscribe(params => {
            this.userId = params.get('id');
            this.checkExisit =false;
        });
    }

    ngOnInit(): void {
       
      
        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
          
        });
      
        var optionsMultipleCity = {
            multiple: true,
            placeholder: 'Select City',
            data: [{ value: 'all', text: 'All' }],
           
          };
           var selectrmultiple: any = document.getElementById(
            'selectr-multiple-citys'
          );
         
           this.selectorMultiple = new Selectr(selectrmultiple, optionsMultipleCity);
           this.getAllCity()
        this.addRunnerForm = this.formBuilder.group({
            client_id: ['1'],
            runner_code: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]{6,}")]],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.email]],
            phone: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state_id: ['', Validators.required],
            serving_city_id: ['', Validators.required],
            pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
            date_of_joining: ['', Validators.required],
            tag_id : [''],
            country_id : ['1'],
        });

       

        if (this.userId) {
            this.isEdit = true;
            this.checkExisit=false;
            this.RunnerService.obtainRunner(this.userId).subscribe((data) => {
                this.displayNotEditedDateTime = data.data.date_of_joining;
                if (data.data.date_of_joining) {
                    data.data.date_of_joining = this.datepipe.transform(data.data.date_of_joining, 'd-MM-YYYY')
                } else {
                    data.data.date_of_joining = ''
                }
                this.addRunnerForm.patchValue(data.data);
             //   this.addRunnerForm.get('serving_city').setValue(data.data.serving_city);
                this.getAllCitySelected(data.data.serving_city_id)

            });
        }else{
            this.checkExisit=true;
      
        }
    }
    public array_search(needle, haystack) {
        for(var i in haystack) {
            if(haystack[i] == needle) return i;
        }
        return false;
    }
    getAllCitySelected(selectedCity:any)
    {
        

     var selectedData = [] as  any;
     this.cityService.getallcityandId().subscribe((data) => {
        const myArray = selectedCity.split(",");

     this.selectorMultiple.removeAll();
      var thisData=[];
      data.data.rows.forEach((item) => {
       if (this.array_search(item.id,myArray) ) 
       {
         thisData.push({ value: item.id, text: item.city_name,selected:true });
   
       }else
       {
         thisData.push({ value: item.id, text: item.city_name});
   
       }
       
       });
       this.selectorMultiple.add(thisData);
     });
    }

    getAllCity()
    {         

     this.cityService.getallcityandId().subscribe((data) => {
   
     this.selectorMultiple.removeAll();
      var thisData=[];
       data.data.rows.forEach((item) => {
          
         thisData.push({ value: item.id, text: item.city_name });
         
       });
       this.selectorMultiple.add(thisData);
     });
    }
    addRunner() {
        this.RunnerTouchSubmit = true;
        if (this.addRunnerForm.valid) {
            this.nextSaveBtnLoding = true;
            if (this.addRunnerForm.value.date_of_joining) {
                this.addRunnerForm.value.date_of_joining = this.datepipe.transform(this.addRunnerForm.value.date_of_joining, 'YYYY-MM-d HH:MM:ss')
            } else {
                this.addRunnerForm.value.date_of_joining = ''
            }

            this.RunnerService.addRunner(this.addRunnerForm.value).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Runner added Successfully");
                        this.router.navigate(['runner']);
                    } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Runner Not Added Successfully`);
                        }
                    }
                },
                (err: any) => {
                    this.toastr.error(`${err}`);
                    console.log(err);
                },
                () => {
                    this.nextSaveBtnLoding = false;
                    this.RunnerTouchSubmit = false;
                }
            );

        }

    }


    editRunner() {
        this.RunnerTouchSubmit = true;
        if (this.addRunnerForm.valid) {
            this.nextSaveBtnLoding = true;
            if (typeof(this.addRunnerForm.value.date_of_joining) == 'object') {
                this.addRunnerForm.value.date_of_joining = this.datepipe.transform(this.addRunnerForm.value.date_of_joining, 'YYYY-MM-d HH:MM:ss')
            } else {
                this.addRunnerForm.value.date_of_joining = this.displayNotEditedDateTime
            }
            this.RunnerService.editRunner(this.addRunnerForm.value, this.userId).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Runner Updated Successfully");
                        this.router.navigate(['runner']);

                    } else {
                        if (res.message) {
                            this.nextSaveBtnLoding = false;
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Runner Not Added Successfully`);
                        }
                    }
                },
                (err: any) => {
                    this.toastr.error(`${err}`);
                    console.log(err);
                },
                () => {
                    this.nextSaveBtnLoding = false;
                    this.RunnerTouchSubmit = false;
                }
            );
        }
    }

    get RunnerInfo() {
        return this.addRunnerForm.controls;
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
        this.router.navigateByUrl('/runner');
    }
    
}
