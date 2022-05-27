import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'src/app/services/customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/services/setting/setting.service';
import { PhleboService } from 'src/app/services/phlebo/phlebo.service';
import { Router } from "@angular/router";
import { AbstractControl,FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LocationService } from 'src/app/services/location/location.service';
import { TourService } from 'src/app/services/Tour/Tour.service';
import { RunnerService } from 'src/app/services/runner/runner.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { LeaveService } from 'src/app/services/leave/leave.service';

@Component({
    selector: "app-deleteModal",
    templateUrl: "./deleteModal.component.html",
    styleUrls: ["./deleteModal.component.scss"]
})
export class deleteModalComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    public title: string;
    public subTitle: string;

    public type: string;
    public data: any;
    public encryptedId: any;
    public categoryName: string;
    public status: boolean;
    public approved: any;
    public page: any = 1;
    public dosStatus: any;
    public dosId: any;
    public areaStatus: any;
    public areaId: any;
    public isBtnLoaded: boolean = false;
    public screenName: any;
    public phleboId: any;
    public phleboStatus: any;
  public  visitId:any;
    isLoadedTable: boolean;
    slotlist: any;
    phleboList: any;
    submittoopsForm: FormGroup;
    phlebotype: any=true;
    phleboDropDown: any;
    form: FormGroup;
    totalSlot: any;
    items: any;
    submitBtnLoader = false;

    constructor(
        private ngbModal: NgbActiveModal,
        private toastr: ToastrService,
        private settingService: SettingService,
        private router: Router,
        private formBuilder: FormBuilder,
        private locationService:LocationService ,
        private tourService:TourService ,
        private runnerService:RunnerService,
        private taskService:TaskService,
        private userService: UserService,
        private partnerService: PartnerService,
        private leaveService: LeaveService,



    ) { }

    ngOnInit(): void {
        this.submitBtnLoader = false;

        this.setDialogProps(this.props);
      
    }
     

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.subTitle = dialogdata.subTitle;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.page = dialogdata.page;
        this.screenName = dialogdata.screenName;
    }
    
    get f(): { [key: string]: AbstractControl } {
        return this.submittoopsForm.controls;
    }
  
    onCloseNext()
    {
    this.passEntry.next(this.page);
    this.ngbModal.close();
    }
  
    onDelete() {

        switch (this.type) {
            case 'deleteTourLocaion':
                this.isBtnLoaded = true;
                console.log(this.data);
                this.tourService.deleteTourLocaion(this.data).subscribe(
                    (res: any) => {
                        if (res && res.success) {
                            this.toastr.success(`${res.message}`);
                            this.onClose();
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                            } else {
                                this.toastr.error(`Delete failed`);
                            }
                        }
                        this.isBtnLoaded = false;
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err.statusText}`);
                        console.log(err);
                    }
                );
                break;
                case 'deleteTaskLocaion':
                    this.isBtnLoaded = true;
                    console.log(this.data);
                    this.taskService.deleteTaskLocaion(this.data).subscribe(
                        (res: any) => {
                            if (res && res.success) {
                                this.toastr.success(`${res.message}`);
                                this.onClose();
                            } else {
                                if (res.message) {
                                    this.toastr.error(`${res.message}`);
                                } else {
                                    this.toastr.error(`Delete failed`);
                                }
                            }
                            this.isBtnLoaded = false;
                        },
                        (err: any) => {
                            this.onClose();
                            this.toastr.error(`${err.statusText}`);
                            console.log(err);
                        }
                    );
                    break;
            case 'deleteLeave':
                this.isBtnLoaded = true;
                console.log(this.data);
                this.leaveService.deleteLeave(this.data).subscribe(
                    (res: any) => {
                        if (res && res.success) {
                            this.toastr.success(`${res.msg}`);
                            this.onClose();
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                            } else {
                                this.toastr.error(`Delete failed`);
                            }
                        }
                        this.isBtnLoaded = false;
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err.statusText}`);
                        console.log(err);
                    }
                );
                break;
                case 'deleteUser':
                this.isBtnLoaded = true;
                console.log(this.data);
                this.userService.deleteUser(this.data).subscribe(
                    (res: any) => {
                        if (res && res.success) {
                            this.toastr.success(`${res.msg}`);
                            this.onClose();
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                            } else {
                                this.toastr.error(`Delete failed`);
                            }
                        }
                        this.isBtnLoaded = false;
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err.statusText}`);
                        console.log(err);
                    }
                );
                break;
                case 'deletePartner':
                this.isBtnLoaded = true;
                console.log(this.data);
                this.partnerService.deletePartner(this.data).subscribe(
                    (res: any) => {
                        if (res && res.success) {
                            this.toastr.success(`${res.msg}`);
                            this.onClose();
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                            } else {
                                this.toastr.error(`Delete failed`);
                            }
                        }
                        this.isBtnLoaded = false;
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err.statusText}`);
                        console.log(err);
                    }
                );
                break;
            case 'deleteCity':
                this.isBtnLoaded = true;
                this.settingService.deleteCity(this.data).subscribe(
                    (res: any) => {
                        if (res && res.success) {
                            this.toastr.success(`${res.message}`);
                            this.onClose();
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                            } else {
                                this.toastr.error(`Delete failed`);
                            }
                        }
                        this.isBtnLoaded = false;
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err.statusText}`);
                        console.log(err);
                    }
                );
                break;
          
                case 'deleteLocation':
                    this.isBtnLoaded = true;
                    this.locationService.deleteLocation(this.data).subscribe(
                        (res: any) => {
                            if (res && res.success) {
                                this.toastr.success(`${res.message}`);
                                this.onClose();
                            } else {
                                if (res.message) {
                                    this.toastr.error(`${res.message}`);
                                    this.onClose();
                                } else {
                                    this.toastr.error(`Delete failed`);
                                }
                            }
                            this.isBtnLoaded = false;
                        },
                        (err: any) => {
                            this.onClose();
                            this.toastr.error(`${err.statusText}`);
                            console.log(err);
                        }
                    );
                    break;
                 
           
                    case 'deleteTour':
                        this.isBtnLoaded = true;
                        this.tourService.deleteTour(this.data).subscribe(
                            (res: any) => {
                                if (res && res.success) {
                                    this.toastr.success(`${res.message}`);
                                    this.onClose();
                                } else {
                                    if (res.message) {
                                        this.toastr.error(`${res.message}`);
                                        this.onClose();
                                    } else {
                                        this.toastr.error(`Delete failed`);
                                    }
                                }
                                this.isBtnLoaded = false;
                            },
                            (err: any) => {
                                this.onClose();
                                this.toastr.error(`${err.statusText}`);
                                console.log(err);
                            }
                        );
                        break;
                        case 'deleteRunner':
                            this.isBtnLoaded = true;
                            this.runnerService.deleteRunner(this.data).subscribe(
                                (res: any) => {
                                    if (res && res.success) {
                                        this.toastr.success(`${res.message}`);
                                        this.onClose();
                                    } else {
                                        if (res.message) {
                                            this.toastr.error(`${res.message}`);
                                            this.onClose();
                                        } else {
                                            this.toastr.error(`Delete failed`);
                                        }
                                    }
                                    this.isBtnLoaded = false;
                                },
                                (err: any) => {
                                    this.onClose();
                                    this.toastr.error(`${err.statusText}`);
                                    console.log(err);
                                }
                            );
                            break;
                            case 'deleteTask':
                                this.isBtnLoaded = true;
                                this.taskService.deleteTask(this.data).subscribe(
                                    (res: any) => {
                                        if (res && res.success) {
                                            this.toastr.success(`${res.message}`);
                                            this.onClose();
                                        } else {
                                            if (res.message) {
                                                this.toastr.error(`${res.message}`);
                                                this.onClose();
                                            } else {
                                                this.toastr.error(`Delete failed`);
                                            }
                                        }
                                        this.isBtnLoaded = false;
                                    },
                                    (err: any) => {
                                        this.onClose();
                                        this.toastr.error(`${err.statusText}`);
                                        console.log(err);
                                    }
                                );
                                break;
                                case 'makeStartTourLocaion':
                                    this.isBtnLoaded = true;
                                    console.log(this.data);
                                    this.tourService.makeStartPoint(this.data).subscribe(
                                        (res: any) => {
                                            if (res && res.success) {
                                                this.toastr.success(`${res.message}`);
                                                this.onClose();
                                            } else {
                                                if (res.message) {
                                                    this.toastr.error(`${res.message}`);
                                                } else {
                                                    this.toastr.error(`Delete failed`);
                                                }
                                            }
                                            this.isBtnLoaded = false;
                                        },
                                        (err: any) => {
                                            this.onClose();
                                            this.toastr.error(`${err.statusText}`);
                                            console.log(err);
                                        }
                                    );
                                    break;

                                    case 'makeEndTourLocaion':
                                        this.isBtnLoaded = true;
                                        console.log(this.data);
                                        this.tourService.makeEndPoint(this.data).subscribe(
                                            (res: any) => {
                                                if (res && res.success) {
                                                    this.toastr.success(`${res.message}`);
                                                    this.onClose();
                                                } else {
                                                    if (res.message) {
                                                        this.toastr.error(`${res.message}`);
                                                    } else {
                                                        this.toastr.error(`Delete failed`);
                                                    }
                                                }
                                                this.isBtnLoaded = false;
                                            },
                                            (err: any) => {
                                                this.onClose();
                                                this.toastr.error(`${err.statusText}`);
                                                console.log(err);
                                            }
                                        );
                                        break;
                                        case 'makeStartTaskLocaion':
                                    this.isBtnLoaded = true;
                                    console.log(this.data);
                                    this.taskService.makeStartPoint(this.data).subscribe(
                                        (res: any) => {
                                            if (res && res.success) {
                                                this.toastr.success(`${res.message}`);
                                                this.onClose();
                                            } else {
                                                if (res.message) {
                                                    this.toastr.error(`${res.message}`);
                                                } else {
                                                    this.toastr.error(`Delete failed`);
                                                }
                                            }
                                            this.isBtnLoaded = false;
                                        },
                                        (err: any) => {
                                            this.onClose();
                                            this.toastr.error(`${err.statusText}`);
                                            console.log(err);
                                        }
                                    );
                                    break;

                                    case 'makeEndTaskLocaion':
                                        this.isBtnLoaded = true;
                                        console.log(this.data);
                                        this.taskService.makeEndPoint(this.data).subscribe(
                                            (res: any) => {
                                                if (res && res.success) {
                                                    this.toastr.success(`${res.message}`);
                                                    this.onClose();
                                                } else {
                                                    if (res.message) {
                                                        this.toastr.error(`${res.message}`);
                                                    } else {
                                                        this.toastr.error(`Delete failed`);
                                                    }
                                                }
                                                this.isBtnLoaded = false;
                                            },
                                            (err: any) => {
                                                this.onClose();
                                                this.toastr.error(`${err.statusText}`);
                                                console.log(err);
                                            }
                                        );
                                        break;
                                        case 'copyTour':
                                            this.isBtnLoaded = true;
                                            console.log("pammd",this.data);
                                            this.tourService.copyTour(this.data).subscribe(
                                                (res: any) => {
                                                    if (res && res.success) {
                                                        this.toastr.success(`${res.message}`);
                                                        this.onClose();
                                                    } else {
                                                        if (res.message) {
                                                            this.toastr.error(`${res.message}`);
                                                        } else {
                                                            this.toastr.error(`Delete failed`);
                                                        }
                                                    }
                                                    this.isBtnLoaded = false;
                                                },
                                                (err: any) => {
                                                    this.onClose();
                                                    this.toastr.error(`${err.statusText}`);
                                                    console.log(err);
                                                }
                                            );
                                            break;
                


        }
    }

    onClose() {
        this.passEntry.next(this.page);
        this.ngbModal.close();
    }
}
