import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/authentication.service";

var misc: any = {
    sidebar_mini_active: true
};



export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
    gardName?: string;
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}

export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: "/dashboard",
        title: "Dashboard",
        type: "link",
        icontype: "ni-shop",
        gardName: "dashboard-view"
    },
   
 {
        path: "/liveview",
        title: "Live View",
        type: "link",
        icontype: "ni ni-image",
        gardName: "users-view"
    },
    {
        path: "/task",
        title: "Tasks",
        type: "link",
        icontype: "ni-calendar-grid-58",
        gardName: "users-view"
    },
    {
        path: "/tour",
        title: "Tours",
        type: "link",
        icontype: "ni-bus-front-12",
        gardName: "ni-archive-2"
    },
    {
        path: "/runner",
        title: "Runners",
        type: "link",
        icontype: "ni-user-run",
        gardName: "users-view"
    },
   
    {
        path: "/location",
        title: "Locations",
        type: "link",
        icontype: "ni-building",
        gardName: "users-view"
    },
    /*{
        path: "/plan",
        title: "Plan",
        type: "link",
        icontype: "ni-money-coins",
        gardName: "users-view"
    },
    {
        path: "/plan-summery",
        title: "Plan Summery",
        type: "link",
        icontype: "ni-circle-08",
        gardName: "users-view"
    },
  {
        path: "/invoices",
        title: "Invoices",
        type: "link",
        icontype: "ni-circle-08",
        gardName: "users-view"
    },*/
    {
        path: "/user",
        title: "Users",
        type: "link",
        icontype: "ni-circle-08",
        gardName: "users-view"
    },
    {
        path: "/customer",
        title: "Customers",
        type: "link",
        icontype: "ni-single-02",
        gardName: "users-view"
    },
    {
        path: "/leaves",
        title: "Leaves",
        type: "link",
        icontype: "ni-single-02",
        gardName: "users-view"
    },
 /*  {
        path: "/roles",
        title: "Roles",
        type: "link",
        icontype: "ni-satisfied",
        gardName: "users-view"
    },
    {
        path: "/myaccount",
        title: "My Profile",
        type: "link",
        icontype: "ni-money-coins",
        gardName: "users-view"
    },*/
    { 
        path: "/settings",
        title: "Setting",
        type: "sub",
        icontype: "ni-settings",
        collapse: "setting",
        isCollapsed: true,
      //  gardName: "setting-view",
        children: [
            { path: "cities", title: "City", type: "link" },
         
        ]
    }
];

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public isCollapsed = true;

    constructor(private authService: AuthenticationService,private router: Router) { }

    ngOnInit() {

        
        let Filteritem = [];
        ROUTES.filter(item => {
            console.log(this.authService.permissions);
            Filteritem.push(item);
        //    this.authService.permissions.map(per => {
                //if (per == item.gardName) {
                  //  Filteritem.push(item);
                //}
          //  });
        });
        this.menuItems = Filteritem;

        this.router.events.subscribe(event => {
            this.isCollapsed = true;
        });
    }
    onMouseEnterSidenav() {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.add("g-sidenav-show");
        }
    }
    onMouseLeaveSidenav() {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-show");
        }
    }
    minimizeSidebar() {
        const sidenavToggler = document.getElementsByClassName(
            "sidenav-toggler"
        )[0];
        const body = document.getElementsByTagName("body")[0];
        if (body.classList.contains("g-sidenav-pinned")) {
            misc.sidebar_mini_active = true;
        } else {
            misc.sidebar_mini_active = false;
        }
        if (misc.sidebar_mini_active === true) {
            body.classList.remove("g-sidenav-pinned");
            body.classList.add("g-sidenav-hidden");
            sidenavToggler.classList.remove("active");
            misc.sidebar_mini_active = false;
        } else {
            body.classList.add("g-sidenav-pinned");
            body.classList.remove("g-sidenav-hidden");
            sidenavToggler.classList.add("active");
            misc.sidebar_mini_active = true;
        }
    }
}
