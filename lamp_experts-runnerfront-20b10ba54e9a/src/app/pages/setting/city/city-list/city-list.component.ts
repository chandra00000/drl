import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deleteModalComponent } from 'src/app/components/deleteModal/deleteModal.component';
import { SettingService } from 'src/app/services/setting/setting.service';
import { CityAddEditComponent } from '../city-add-edit/city-add-edit.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {


    //for pagenation
    service: any = {
        page: 1,
        pageSize: 4,
        maxSize: 5
    };
    // to get the collection size Fro pagenation
    public collectionSize: any;

    //for shorting and Filter
    public sortColumn: any = 'created_at';
    public sortDirection: any = 'desc';


    public searchNamefilter: any; //filter to search name

    public CitysLists: any = [];

    public isLoadedTable: boolean = true;

    constructor(
        private settingService: SettingService,
        private modalService: NgbModal,
    ) { }

    refreshCity() {
        //Start loading
        this.isLoadedTable = true;

        //Default
        let short = `&sort=${this.sortDirection}`;
        let filtersortColumn = `&sort_by=${this.sortColumn}`;

        //If Has any
        let searchbox = this.searchNamefilter ? `&s=${this.searchNamefilter}` : '';

        this.settingService.getCitysForTable(`p=${this.service.page}${searchbox}${filtersortColumn}${short}`).subscribe((data) => {
            this.CitysLists = data.data.rows;
            this.collectionSize = data.data.count;
            this.isLoadedTable = false;

        });
    }

    onEnterPress(name:string){
        console.log(name);
        this.refreshCity();
    }

    //Search Customer
    searchCity() {
        //call api
        this.refreshCity();
    }

    resetFilter() {
        this.searchNamefilter = '';
        this.refreshCity();
    }

    //Short Customer
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
        this.refreshCity();
    }


    ngOnInit() {
        this.refreshCity();
    }

    add() {
      
        const modalRef = this.modalService.open(CityAddEditComponent, {
            centered: true,
            size: 'sm',
        });
        modalRef.componentInstance.props = {
            title: 'Add City',
            type: 'add',
          
            page: `page=${this.service.page}`,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshCity();
        })
    }

    edit(data: any) {
        const modalRef = this.modalService.open(CityAddEditComponent, {
            centered: true,
            size: 'sm',
        });
        modalRef.componentInstance.props = {
            title: 'Edit city',
            type: 'edit',
            page: `page=${this.service.page}`,
            data: data
        }
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshCity()
        })
    }

   
    delete(data: any) {
        const modalRef = this.modalService.open(deleteModalComponent, {
            centered: true,
            size: 'sm',
            windowClass: 'alert-popup',
        });
        modalRef.componentInstance.props = {
            title: `Delete this City?`,
            subTitle: data.city_name,
            type: 'deleteCity',
            data: data.id,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshCity();
        });
    }
}
