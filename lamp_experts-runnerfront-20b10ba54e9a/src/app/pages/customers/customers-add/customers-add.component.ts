import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cityService } from '../../../services/city/city.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Selectr from 'mobius1-selectr';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
@Component({
  selector: 'app-customers-add',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.scss']
})
export class CustomersAddComponent implements OnInit {

    public isEdit: boolean;
    public userId: any;
    citylistForDropdown: any;

    public CustomerTouchSubmit = false;
    public nextSaveBtnLoding = false;
    public addCustomerForm!: FormGroup;
    public Customerdata = { first_name: '' };

    public statelistForDropdown = [];
    public citylistForDropdownByState = [];
    public areacodelistForDropdown = [];
    displayNotEditedDateTime: any;
    selectrSingle: any;

    optionsSingle = {
        placeholder: 'Select Customer',
        // data: []
    };
    existCustomerHide: boolean;
    checkExisit: boolean=true;
    riderID: any;
    RunnerTouchSubmit: boolean=false;;
    constructor(
        private formBuilder: FormBuilder,
        private cityService: cityService,
        private CustomerService: PartnerService,
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
        this.cityService.getallcityandId().subscribe((data) => {
            this.citylistForDropdown =data.data.rows;
        });
   

        this.addCustomerForm = this.formBuilder.group({
            client_id: ['1'],
            partner_code: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]{6,}")]],
            partner_name: ['', Validators.required],
            email: [''],
            phone: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
            address: ['', Validators.required],
            state_id: ['', Validators.required],
            city_id: ['', Validators.required],
            pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
          
            country_id : ['1'],
        });

       

        if (this.userId) {
            this.isEdit = true;
            this.checkExisit=false;
            this.CustomerService.obtainPartner(this.userId).subscribe((data) => {
               
                this.addCustomerForm.patchValue(data.data);

            });
        }else{
            this.checkExisit=true;
      
        }
    }

    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }

    addCustomer() {
        this.CustomerTouchSubmit = true;

        console.log("000",this.addCustomerForm);
        if (this.addCustomerForm.valid) {
            this.nextSaveBtnLoding = true;
         
            this.CustomerService.addPartner(this.addCustomerForm.value).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Customer added Successfully");
                        this.router.navigate(['customer']);
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
                },
                () => {
                    this.nextSaveBtnLoding = false;
                    this.CustomerTouchSubmit = false;
                }
            );

        }

    }


    editCustomer() {
        this.CustomerTouchSubmit = true;
        if (this.addCustomerForm.valid) {
            this.nextSaveBtnLoding = true;
            if (typeof(this.addCustomerForm.value.date_of_joining) == 'object') {
                this.addCustomerForm.value.date_of_joining = this.datepipe.transform(this.addCustomerForm.value.date_of_joining, 'YYYY-MM-d HH:MM:ss')
            } else {
                this.addCustomerForm.value.date_of_joining = this.displayNotEditedDateTime
            }
            this.CustomerService.editPartner(this.addCustomerForm.value, this.userId).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Customer Updated Successfully");
                        this.router.navigate(['customer']);

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
                    this.CustomerTouchSubmit = false;
                }
            );
        }
    }

    get CustomerInfo() {
        return this.addCustomerForm.controls;
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
        this.router.navigateByUrl('/customer');
    }
  
}
