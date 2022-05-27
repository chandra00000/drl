import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from 'src/app/services/setting/setting.service';

@Component({
  selector: 'app-servicezone-list',
  templateUrl: './servicezone-list.component.html',
  styleUrls: ['./servicezone-list.component.scss']
})
export class ServicezoneListComponent implements OnInit {


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
            this.CitysLists = data.data.data;
            this.collectionSize = data.data.recordsFiltered;
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

    
   
}
