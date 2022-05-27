import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
    selector: 'app-pageLoader',
    templateUrl: './pageLoader.component.html',
    styleUrls: ['./pageLoader.component.scss']
})
export class pageLoaderComponent implements OnInit {
    constructor(public loaderService: LoaderService) { }
    ngOnInit() {
    }
}
