import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/services/setting/setting.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { cityService } from 'src/app/services/city/city.service';
import { LocationService } from 'src/app/services/location/location.service';
declare const google: any;

@Component({
    selector: "app-enterModal",
    templateUrl: "./locationModal.component.html",
    styleUrls: ["./locationModal.component.scss"]
})
export class LocationModalComponent implements OnInit {
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
    public locationForm: FormGroup;

    //Dropdown List
    public statelistForDropdown = [];
    public citylistForDropdownByState = [];
    public citylistForDropdown = [];

    constructor(
        private ngbModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private cityService: cityService,
        private toastr: ToastrService,
        private settingService: SettingService,
        private locationService: LocationService,
        private router: Router,

    ) { }

    ngOnInit(): void {
        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
        });

       
        this.locationForm = this.formBuilder.group({
           
           
            location_code: ['',[Validators.required, Validators.pattern("[a-zA-Z0-9]{6,}")]],
            location_name: ['', Validators.required],
            country_id: ['1'],
            state_id: ['', Validators.required],
            city_id: ['', Validators.required],
            lat: ['', Validators.required],
            long: ['', Validators.required],
            address: ['', Validators.required],       
            pincode: ['', Validators.required],
            client_id: ['1', Validators.required],
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
    
    get locationInfo() {
        return this.locationForm.controls;
    }
    getGeocode() {
        let address=this.locationForm.value.address;

        console.log("padam",address);
        let latitude :any;
        let longitude :any;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, (res, status) => {
          console.log(res, status)
          if (status == google.maps.GeocoderStatus.OK) {
            
              latitude= JSON.stringify(res[0].geometry.location.lat()),
              longitude= JSON.stringify(res[0].geometry.location.lng())
              this.locationForm.get('lat').setValue(latitude);
              this.locationForm.get('long').setValue(longitude);
      
          } 
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

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.pages = dialogdata.page;
        if (['edit'].includes(this.type)) {
            this.getCities_data(this.data.state_id);
            this.editId = this.data.id;
            console.log("padam",this.data);
            this.locationForm.patchValue(this.data);
           this.locationForm.get('state_id').setValue(this.data.state_id);
           this.locationForm.get('city_id').setValue(this.data.city_id);
        }
    }
   
    closeModal() {
        this.passEntry.next(this.pages);
        this.ngbModal.close();
    }

    create() {
        if (this.locationForm.valid) {
            this.isBtnLoaded = true;
            this.locationService.createLocation(this.locationForm.value).subscribe((res: any) => {
                if (res.success) {
                    this.toastr.success(`${res.message}`);
                    console.log("padamkoli");
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigate(['task/add-task']);
                    
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
            this.locationForm.markAllAsTouched();
        }
    }

    edit() {
        if (this.locationForm.valid) {
            this.isBtnLoaded = true;
            this.locationService.updateLocation(this.locationForm.value, this.editId).subscribe((res: any) => {
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
            this.locationForm.markAllAsTouched();
        }
    }
}
