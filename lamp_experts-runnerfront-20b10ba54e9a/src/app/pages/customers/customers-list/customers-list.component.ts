import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cityService } from 'src/app/services/city/city.service';
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { PartnerService } from 'src/app/services/partner/partner.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

    service: any = {
        page: 1,
        pageSize: 4,
        maxSize: 5
    };
    

    public sortColumnDefault: any = 'createdAt';
    public sortCustomersDefault: any = 'desc';
    public collectionSize: any = 50; // to get the collection size
    public sortCustomers: any;

    public searchNamefilter: any; //filter to search name

    public isLoadedTable: boolean = true;
    public id: any;
    public runnerList: any = [];
    public runnerFilter: any = '';
    public statusFilter: any = '';
    public roleFilter: any = '';
    public sortDirection: any = 'desc';
    public sortColumn: any = 'createdAt';

    public fromDateFilter: any = '';
    public toDateFilter: any = '';

    customerlistForDropdown: any;
    areaCodeListForDropdown = [];
    citylistForDropdown: any;

    public cityFilter: any = '';
    public stateFilter: any = '';
    statelistForDropdown: any;
    customerList: any;


    constructor(
        private router: Router,
        private modalService: NgbModal,
        private customerService: PartnerService,
        private toastr: ToastrService,
        private cityService: cityService,
        private authService: AuthenticationService,

    ) { }


    refreshCustomer() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sd=${this.sortDirection}`;
        let filtersortColumn = `&sb=${this.sortColumn}`;

        // s=Agraa&serving_area_code=38&p=1&sort_by=&sort=asc&limit=15
        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';

        let cityFilter = this.cityFilter ? `&city_id=${this.cityFilter}` : '';
        let stateFilter = this.stateFilter ? `&state=${this.stateFilter}` : '';

        this.customerService.obtainPartners(`p=${this.service.page}${cityFilter}${stateFilter}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.customerList = data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;


        });
    }

    onKeyEnter(event:any){
        this.refreshCustomer();
    }
    //Search Customer
    searchCustomer() {
        //call api
        this.refreshCustomer();

    }
    resetFilter() {
        this.cityFilter = '';
        this.stateFilter = '';
        this.searchNamefilter = '';
        this.refreshCustomer();
    }

    sort(data: any) {
        //set clicked Column name
        this.sortColumn = data;
        //change asc to dsc or dsc to asc
        if (this.sortDirection == 'asc') {
            this.sortDirection = 'desc';
        } else {
            this.sortDirection = 'asc';
        }
        //call api
        this.refreshCustomer();
    }


    ngOnInit(): void {
      
        this.refreshCustomer();

        this.cityService.getallstateandId().subscribe((data) => {
            this.statelistForDropdown = data.states;
          
        });

       
   
    }
    getCities(event)
    {
        this.cityService.getallCitysandbyId(event.target.value).subscribe((data) => {
            this.citylistForDropdown = data.data.rows;
        });
   
  
    }

    addCustomer() {
        this.router.navigateByUrl('customer/add-customer', {
            state: {
                form: 'add'
            }
        });
    }

    editCustomer(id: any) {
        const url =
            this.router.navigateByUrl('customer/edit-customer/' + id, {
                state: {
                    form: 'edit'
                }
            });;

    }

 
    deleteCustomer(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this Customer?`,
            subTitle: data.partner_name,
            type: 'deletePartner',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshCustomer();
        });
    }


}
