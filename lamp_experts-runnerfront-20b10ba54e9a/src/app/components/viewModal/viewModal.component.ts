
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'src/app/services/customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { SettingService } from 'src/app/services/setting/setting.service';
import { PhleboService } from 'src/app/services/phlebo/phlebo.service';
import { Router } from "@angular/router";

@Component({
    selector: "app-viewModal",
    templateUrl: "./viewModal.component.html",
    styleUrls: ["./viewModal.component.scss"]
})
export class viewModalComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    public title: string;
    public subTitle: any={};

    constructor(
        private ngbModal: NgbActiveModal,
        private toastr: ToastrService,
      
        private router: Router,

    ) { }

    ngOnInit(): void {
        this.setDialogProps(this.props);
        console.log("pp",this.subTitle);
    }

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.subTitle = dialogdata.subTitle;
        
        
    
    }

    

    onClose() {
                  this.router.navigateByUrl('/user');

        this.ngbModal.close();
    }
}
