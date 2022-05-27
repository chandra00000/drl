import { Component, HostListener, OnInit } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';

@Component({
    selector: "public-root",
    templateUrl: "./public.component.html"
})
export class publicComponent implements OnInit {
    
    public isMobileResolution: boolean;

    constructor(private router: Router) {
        if (window.innerWidth < 1200) {
            this.isMobileResolution = true;
        } else {
            this.isMobileResolution = false;
        }
    }

    @HostListener("window:resize", ["$event"])

    isMobile(event) {
        if (window.innerWidth < 1200) {
            this.isMobileResolution = true;
        } else {
            this.isMobileResolution = false;
        }
    }

    ngOnInit() {
     
    }

}
