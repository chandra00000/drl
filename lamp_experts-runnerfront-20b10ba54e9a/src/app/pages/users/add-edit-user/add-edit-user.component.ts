import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cityService } from 'src/app/services/city/city.service';
import { CustomersService } from 'src/app/services/customer/customer.service';
import { RoleService } from 'src/app/services/role/role.service';
import { UserType } from 'src/app/services/usertype/usertype.service';
import { UserService } from 'src/app/services/user/user.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Selectr from "mobius1-selectr";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { viewModalComponent } from 'src/app/components/viewModal/viewModal.component';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  public userFrom!: FormGroup;
  public userTouchSubmit = false;
  public nextSaveBtnLoding = false;
  public statelistForDropdown: any;
  public citylistForDropdown: any;
  public customerDropDown: any;
  public AllCitylistForDropdown: any;
  public roleDropDown: any;
  public usertypeDropDown: any;
  public userId: any;
  public isEdit: boolean;
  public isSelectCustomer = '';
  public optionsMultipleCity = {
    multiple: true,
    placeholder: 'Select City',
    data: [{ value: 'all', text: 'All' }],
    selectedValue:[]
  };
  public  optionsMultipleCustomer = {
    multiple: true,
    placeholder: 'Select Customer',
    data: [{ value: 'all', text: 'All',selected:true }],   
  };
  selectorMultiple: Selectr;
  selectedCity: [];
  selectorMultipleCustomer: Selectr;
  selectedCustomer: any;
  userType: any;
  login_customer_id: any;
  userTypeid: any;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private cityService: cityService,
    private userService: UserService,
    private customerService: CustomersService,
    private roleService: RoleService,
    private usertypeService: UserType,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private modalService: NgbModal,

  ) {
  //  this.login_customer_id= this.authService.user.customer_id;;
   
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.cityService.getallstateandId().subscribe((data) => {
      this.statelistForDropdown = data.states;
    
  });
    this.userFrom = this.formBuilder.group({
      client_id: ['1'],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      city: ['', Validators.required],
      city_id: ['1'],
      state_id: ['', Validators.required],
      pincode: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{6}$')],
      ],
      country_id: ['1'],
      role_id: ['', Validators.required],
     
       user_type: ['', Validators.required],
    //user_type: ['', Validators.required],
    });

    if (this.userId) {
      this.isEdit = true;
      this.userService.obtainUser(this.userId).subscribe((data) => {
        this.userFrom.patchValue(data.data);
     //   this.userFrom.get('user_type').setValue(data.data.user_type_id);
      
       
      });
    

    }
 
  }
  

  
  getAllCustomerSelected()
  {
    var selectedData = [] as  any;

    selectedData=this.selectedCustomer;

  this.customerService.getallCustomers().subscribe((data) => {
    this.customerDropDown = data.data;
   
    this.selectorMultipleCustomer.removeAll();
   var thisData=[];
    data.data.forEach((item) => {
        if (selectedData.indexOf( item.id) > -1) {
          thisData.push({ value: item.id, text: item.name,selected:true });
      } else {
        thisData.push({ value: item.id, text: item.name });
            }

     
      
    });
    this.selectorMultipleCustomer.add(thisData);
   
  });
}
  getAllCustomer()
  {

  this.customerService.getallCustomers().subscribe((data) => {
    this.customerDropDown = data.data;
    this.selectorMultipleCustomer.removeAll();
    var thisData=[];
     data.data.forEach((item) => {       
           thisData.push({ value: item.id, text: item.name});       
     });
     this.selectorMultipleCustomer.add(thisData);
  });
}

  getAllCitySelected()
 {
  var selectedData = [] as  any;
  selectedData=this.selectedCity;
  this.cityService.getallcityandId().subscribe((data) => {
    this.AllCitylistForDropdown = data.data;

  this.selectorMultiple.removeAll();
   var thisData=[];

   data.data.forEach((item) => {
    if (selectedData.indexOf(item.id) > -1) 
    {
      thisData.push({ value: item.id, text: item.city_name,selected:true });

    }else
    {
      thisData.push({ value: item.id, text: item.city_name});

    }
    
    });
    this.selectorMultiple.add(thisData);
  });
 }
 
 getAllCity()
 {
   
  this.cityService.getallcityandId().subscribe((data) => {
    this.AllCitylistForDropdown = data.data;

  this.selectorMultiple.removeAll();
   var thisData=[];
    data.data.forEach((item) => {
       
      thisData.push({ value: item.id, text: item.city_name });
      
    });
    this.selectorMultiple.add(thisData);
  });
 }

  get mainUser() {
    return this.userFrom.controls;
  }

  GoBack() {
    this.router.navigateByUrl('/user');
  }
  

  openModel(data){
    const modalRef = this.modalService.open(viewModalComponent, {
        centered: true,
        size: 'sm',
        windowClass: 'alert-popup',
    });
    modalRef.componentInstance.props = {
        title: `New user created. Please ensure to copy credential for future use.`,
        subTitle: data,
    };
}
  addUser() {
    this.userTouchSubmit = true;
    if (this.userFrom.valid) {
      this.nextSaveBtnLoding = true;
      this.userService.createUser(this.userFrom.value).subscribe(
        (res: any) => {
          if (res.success) {
            this.openModel(res.data);
           // this.toastr.success(`${res.message}`);
           // this.router.navigateByUrl('/users');
          } else {
            if (res.message) {
              this.toastr.error(`${res.message}`);
            } else {
              this.toastr.error(`User Not Added Successfully`);
            }
          }
        },
        (err: any) => {
          this.toastr.error(`${err}`);
          console.log(err);
        },
        () => {
          this.nextSaveBtnLoding = false;
          this.userTouchSubmit = false;
        }
      );
    }
  }

  editUser() {
    this.userTouchSubmit = true;
    if (this.userFrom.valid) {
      this.nextSaveBtnLoding = true;
      this.userService.editUser(this.userFrom.value, this.userId).subscribe(
        (res: any) => {
          if (res.success) {
            this.toastr.success(`${res.message}`);
            this.router.navigate(['user']);
          } else {
            if (res.message) {
              this.nextSaveBtnLoding = false;
              this.toastr.error(`${res.message}`);
            } else {
              this.toastr.error(`Customer Not Added Successfully`);
            }
          }
        },
        (err: any) => {
          this.toastr.error(`${err}`);
          console.log(err);
        },
        () => {
          this.nextSaveBtnLoding = false;
          this.userTouchSubmit = false;
        }
      );
    }
  }

  omit_special_char(event) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  getLastIndex(Arr: any) {
    if (Arr.length > 0) {
      return Arr.length - 1;
    } else {
      return Arr.length;
    }
  }
}
