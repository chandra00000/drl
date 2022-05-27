import { Component, HostListener, OnInit } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';

@Component({
    selector: "secure-root",
    templateUrl: "./secure.component.html",
})
export class secureComponent implements OnInit {
    test: Date = new Date();
    public isCollapsed = true;
    public title = 'Gosamplify Design';
    public isLogin: boolean = false;
    public isMobileResolution: boolean;
    bigContainer: boolean;

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
        // this.router.events.forEach((event) => {
        //     if (event instanceof NavigationStart) {
        //         if (event['url'] === '/login' || event['url'] === '/') {
        //             this.isLogin = true;
        //         }
        //         else {
        //             if (event['url'].includes('/order-public-view/')) {
        //                 this.isLogin = true;
        //                 this.bigContainer = true;
        //             } else if (event['url'].includes('/qr-payment/')) {
        //                 this.isLogin = true;
        //                 this.bigContainer = true;
        //             }
        //             else if (event['url'].includes('/upsell-order/')) {
        //                 this.isLogin = true;
        //                 this.bigContainer = true;
        //             }
        //             else if (event['url'].includes('/upsell-edit/')) {
        //                 this.isLogin = true;
        //                 this.bigContainer = true;
        //             }
        //             else {
        //                 this.isLogin = false;
        //             }
        //         }
        //     }
        // })
    }

}
