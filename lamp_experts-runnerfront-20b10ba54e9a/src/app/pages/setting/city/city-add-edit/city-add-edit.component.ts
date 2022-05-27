import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from "../../../../services/setting/setting.service";
import { cityService } from '../../../../services/city/city.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-city-add-edit',
    templateUrl: './city-add-edit.component.html',
    styleUrls: ['./city-add-edit.component.scss']
})
export class CityAddEditComponent implements OnInit {
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
    public cityForm: FormGroup;

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
    ) { }

    ngOnInit(): void {
        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
        });

        this.cityForm = this.formBuilder.group({
            country_id: ['1'],
            state_id: ['', Validators.required],
            city_name: ['', Validators.required],
            city_code: ['', Validators.required],
        });

        this.setDialogProps(this.props);
    }

    get cityInfo() {
        return this.cityForm.controls;
    }

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.pages = dialogdata.page;
        if (['edit'].includes(this.type)) {
            this.editId = this.data.id;
            console.log("padam",this.data);
            this.cityForm.patchValue(this.data);
           // this.cityForm.get('state_id').setValue(this.data.state.id);
           this.cityForm.get('state_id').setValue(2);
        }
    }

    closeModal() {
        this.passEntry.next(this.pages);
        this.ngbModal.close();
    }

    create() {
        if (this.cityForm.valid) {
            this.isBtnLoaded = true;
            this.settingService.createCity(this.cityForm.value).subscribe((res: any) => {
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
            this.cityForm.markAllAsTouched();
        }
    }

    edit() {
        if (this.cityForm.valid) {
            this.isBtnLoaded = true;
            this.settingService.updateCity(this.cityForm.value, this.editId).subscribe((res: any) => {
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
            this.cityForm.markAllAsTouched();
        }
    }
}
