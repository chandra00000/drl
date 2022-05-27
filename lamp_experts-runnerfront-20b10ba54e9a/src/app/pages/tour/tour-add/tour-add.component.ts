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
import { PartnerService } from 'src/app/services/partner/partner.service';
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tour-add',
  templateUrl: './tour-add.component.html',
  styleUrls: ['./tour-add.component.scss']
})
export class TourAddComponent implements OnInit {

    public isEdit: boolean;
    public userId: any;
    citylistForDropdown: any;
    selectorMultiple: Selectr;

    public TourTouchSubmit = false;
    public nextSaveBtnLoding = false;
    public nextSaveBtnLoding_location = false;

    
    public addTourForm!: FormGroup;
    public addLocationForm!: FormGroup;

    
    public Tourdata = { first_name: '' };

    public statelistForDropdown = [];
    public citylistForDropdownByState = [];
    public areacodelistForDropdown = [];
    displayNotEditedDateTime: any;
    selectrSingle: any;
    public tourID : any;

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
    partnerlistForDropdown: any;
    client_id: any=1;
    LocationTouchSubmit: boolean=false;
    tourLocationlist: any;
    
    constructor(
        private formBuilder: FormBuilder,
        private cityService: cityService,
        private TourService: TourService,
        private toastr: ToastrService,
        private router: Router,
        public datepipe: DatePipe,
        private actRoute: ActivatedRoute,
        private locationService:LocationService,
        private partnerService:PartnerService ,
        private localStorageService:LocalStorageService,
        private modalService: NgbModal,


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
        this.locationService.getLocationList().subscribe((data) => {
            this.locationlistForDropdown = data.data.rows;
          
        });
        this.partnerService.getPartnerByclientId(this.client_id).subscribe((data) => {
            this.partnerlistForDropdown = data.data;
          
        });
      
        this.addTourForm = this.formBuilder.group({
            client_id: ['1'],
            tour_number: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]{6,}")]],
            tour_name: ['', Validators.required],
            city_id: ['', Validators.required],
            state_id: ['', Validators.required],
            mon: [''],
            tue: [''],
            wed: [''],
            thu: [''],
            fri: [''],
            sat: [''],
            sun: [''],
          //  location: this.formBuilder.array([this.createLocationInfo()]),

        });
        this.addLocationForm = this.formBuilder.group({
            client_id: ['1'],
            tour_id: [''],
            'location_address': new FormControl('', Validators.required),
            'scheduled_time': new FormControl('', Validators.required),          
          //  location: this.formBuilder.array([this.createLocationInfo()]),

        });


        

        if (this.userId) {
            console.log("padamkoli");
            this.isEdit = true;
            this.checkExisit=false;
            this.tourID=this.userId;
            this.getTourLocationData( this.userId);
            this.TourService.obtainTour(this.userId).subscribe((data) => {
                
                this.getCitynamebystate(data.data.state_id)

              //  this.addTourForm.get('serving_city').setValue(data.data.serving_city);
              this.addTourForm.patchValue(data.data);

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

    private createLocationInfo(): FormGroup {
        return new FormGroup({
            'location_address': new FormControl('', Validators.required),
            'scheduled_time': new FormControl('', Validators.required),          
            'start_point': new FormControl(''),
            'end_point': new FormControl(''),
        })
    }
    onChange(e){    

        this.isChecked =false;
        this.isCheckedName = e.target.name;
        console.log("aman",e.target.name);  
    }
    masterAddItem() {
        const data = this.addTourForm.get('location') as FormArray
        if (data.controls[data.controls.length - 1].invalid) {
            return;
        } else {
            if(data.controls.length == 7){
                this.toastr.error(`You can only add 7 items max`);
            }
            if(data.controls.length <= 7){
                data.push(this.createLocationInfo())
            }else{
                this.toastr.error(`You can only add 7 items max`);
            }
        }
        this.lastLoopItem = data.controls.length - 1;
    }
    masterRemoveItem(i: number) {
        const data = this.addTourForm.get('location') as FormArray
        if (data.length > 1) {
            data.removeAt(i)
        } else {
            data.reset()
        }
        this.lastLoopItem = data.controls.length - 1;
    }

    getCitynamebystate(state_id: number) {
        this.cityService.getallCitysandbyId(state_id).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
    }

    getAreaCodebyCity(city_id: number) {
        this.TourService.getAllAreacodeById(city_id).subscribe((data) => {
            this.areacodelistForDropdown = data.data;
        });
    }
  
    getTourLocationData(data:any)
    {
        
        this.TourService.obtainTour(data).subscribe((data) => {
            this.tourLocationlist = data.data;
            console.log("padam",this.tourLocationlist);
        });
   
  
    }
    addTour() {
        this.TourTouchSubmit = true;

        if (this.addTourForm.valid) {
            this.nextSaveBtnLoding = true;
           

            this.TourService.addTour(this.addTourForm.value).subscribe(
                (res: any) => {
                    if (res.success) {
                        console.log("0-0-0-",res.data.id);
                        this.toastr.success("Tour added Successfully");
                        this.localStorageService.addTourId(res.data.id);
                        this.getTourLocationData(res.data.id);
                        this.router.navigate(['/tour/tour-edit/'+res.data.id])
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
                    console.log(err);
                },
                () => {
                    this.nextSaveBtnLoding = false;
                    this.TourTouchSubmit = false;
                }
            );

        }

    }

    addLocation() {
        this.LocationTouchSubmit = true;

        if (this.addLocationForm.valid) {
            this.nextSaveBtnLoding_location = true;
         
          this.addLocationForm.get('tour_id').setValue(this.userId);
         

            this.TourService.addTourLocation(this.addLocationForm.value).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Location added to tour Successfully");
                       
                        this.getTourLocationData( this.userId);
                        this.selectorMultiple.reset();
                        this.addLocationForm.reset()

                        this.router.navigate(['tour/tour-edit/'+this.userId]);
                       
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
          this.addTourForm.get('rider_id').setValidators([Validators.required]);
          this.addTourForm.get('rider_id').updateValueAndValidity();
        

        } else {
           this.selectrSingle.removeAll();

            this.existTourHide=false;
            this.addTourForm.get('rider_id').clearValidators();
            this.addTourForm.get('rider_id').updateValueAndValidity();
          
        }

    }
*/

editTour() {
        console.log("amit",this.addTourForm.value);
        this.TourTouchSubmit = true;
        if (this.addTourForm.valid) {
            this.nextSaveBtnLoding = true;
        
            this.TourService.editTour(this.addTourForm.value, this.userId).subscribe(
                (res: any) => {
                    if (res.success) {
                        this.toastr.success("Tour Updated Successfully");
                        
                        this.getTourLocationData( this.userId);
                        this.router.navigate(['tour/tour-edit/'+this.userId]);
                       
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
                    this.TourTouchSubmit = false;
                }
            );
        }
    }

    get TourInfo() {
        return this.addTourForm.controls;
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
        
        this.localStorageService.clearTourId();
        this.router.navigateByUrl('/tour');
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
            type: 'deleteTourLocaion',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
           
            this.getTourLocationData( this.userId);
            this.router.navigate(['tour/tour-edit/'+this.userId]);
           
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
            type: 'makeStartTourLocaion',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
        
                        this.getTourLocationData( this.userId);
                        this.router.navigate(['tour/tour-edit/'+this.userId]);
                    
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
            type: 'makeEndTourLocaion',
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
          
            this.getTourLocationData( this.userId);
            this.router.navigate(['tour/tour-edit/'+this.userId]);
        
        });
    }

}
