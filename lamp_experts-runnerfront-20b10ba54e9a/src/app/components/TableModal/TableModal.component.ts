import { Component, OnInit, Input, Output, EventEmitter,ElementRef,QueryList, ViewChildren  } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
    selector: "app-TableModal",
    templateUrl: "./TableModal.component.html",
    styleUrls: ["./TableModal.component.scss"]
})
export class TableModalComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
    public fileName: any;
    public file: any;
    public fileerrmsg: boolean;

    public title: string;
    public subTitle: string;
    public type: string;
    public data: any;
    public page: any = 1;
    public isLoadedTable: boolean = true;
    visit_number: any;
    exportFileList: any;
    notimportedorderList: any;
    bankDepositList: any;
    public checkdata: any = [];
    total_amount_collected: any;
    public bankdeposit: FormGroup;
    public isBtnLoaded: boolean = false;
    citylistForDropdown: any;
    today=new Date();
    viewTaskDetail: any;


    constructor(
        private ngbModal: NgbActiveModal,
        private toastr: ToastrService,
   
        private formBuilder: FormBuilder,
        private taskService:TaskService

    ) { }

    ngOnInit(): void {
        
      

      
this.setDialogProps(this.props);
       
        switch (this.type) {
          
			case 'viewLocationDetail':
                this.viewTaskDetail =this.data;                
                break;
               

                case 'rejectedID':
                    console.log(this.data)
                  
        }
    }

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.subTitle = dialogdata.subTitle;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.page = dialogdata.page;
        this.visit_number = dialogdata.visit_number;
        console.log(   this.visit_number);
    }

  
    onClose() {
        this.passEntry.next(this.page);
        this.ngbModal.close();
    } 
    get bankdepositInfo() {
        return this.bankdeposit.controls;
    }
 
   
      onCloseNext() {
        console.log("padam");
    
         this.passEntry.next(this.page);
         this.ngbModal.close();
     }
     onFileSelect(event) {
        if (event.target.files.length > 0) {
            const image = event.target.files[0];
            this.fileName = image.name;
            this.file = image;
            this.fileerrmsg = false;
        }
    }
   
 
}
