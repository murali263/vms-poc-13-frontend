import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  NgForm,
  Validators,
  FormGroupDirective,
  FormGroup,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../server/global.service';

@Component({
  selector: 'app-companyadmin',
  templateUrl: './companyadmin.component.html',
  styleUrls: ['./companyadmin.component.css'],
})
export class CompanyadminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  selectedTab: any;
  hide = true;
  maxlength: number = 10;
  searchedText: String = '';
  //-------------------------username validation messages----------------------//
  emptyUserName = 'You must enter a username';
  minlengthUserName = 'user name must be at least 3 characters long';
  maxlengthUserName = 'username cannot exceed 20 characters';
  userNamePattern = 'username should be in alphabets only';
  //-----------------------phone number validation messages----------------------//
  emptyPhoneNumber = 'You must enter a phonenumber';
  maxlengthPhoneNumber = 'phonenumber cannot exceed 10 characters';
  minlengthPhoneNumber = 'phonenumber must be at least 3 characters long';
  PhoneNumberPattern = 'phonenumber should be in numericals only';
  //---------------------------------zipcode---------------------------------------------//
  maxlengthzip = 'maxlength must be at least 6 characters';
  zipPattern = 'zipcode should be in numericals only';
  //--------------------------------common validation-----------------------------------------//
  characterspattern = 'accept  alphabets only';
  //-------------------------password-----------------------------------------------//

  minlengthpassword = 'password must be at least 5 characters long';
  maxlengthpassword = 'password cannot exceed 7 characters';
  passwordPattern = 'password  should contains Eg:(Abc@123)';


  displayedColumns: string[] = [
    'Name',
    'Phone Number',
    'Email',
    
    'City',
    'Zip Code',
  ];
  value:any;
  data: any;
  companyArr: MatTableDataSource<any>;
  createcompanyadmin: FormGroup;
  constructor(
    private fb: FormBuilder,
    public global: GlobalService,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getsubadmin();
    this.buildForm();
  }
  buildForm(){
  this.createcompanyadmin = this.fb.group({
    fname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ]),
    ],
    lname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ]),
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{5,}'
        ),
      ],
    ],
    phonenumber: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ],
    ],
    createdBy: [
      localStorage.getItem('username')?.toString(),
      Validators.required,
    ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    ],
    role: ['subadmin', Validators.required],
    
    address: ['', Validators.required],
    city: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],

    zip: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[1-9]{1}[0-9]{5}'),
      ],
    ],
  });
}

  //--------------------------------------subadmin get list --------------------------------//

  tabChange(event: any) {
    // on tab change
    this.selectedTab = event;
    if (this.selectedTab === 0) {
      this.getsubadmin();
    } else if (this.selectedTab === 1) {
      this.buildForm();
    }
  }

  getsubadmin() {
    this.global.getsubadminlist().subscribe((data: any) => {
      this.companyArr = data?.res;
      this.companyArr = new MatTableDataSource(data?.res);
      this.value=data?.res
      this.companyArr.paginator = this.paginator;
    });
  }
  createsubadmin() {


    if (this.createcompanyadmin.invalid) {
      this.snackbar.open('please enter required fields', 'ok', {
        duration: 5000,
      });
    }
    if (this.createcompanyadmin.valid) {
      this.global
        .createrole(this.createcompanyadmin.value)
        .subscribe((res: any) => {
          this.getsubadmin();
          this.snackbar.open('successfully created', 'ok', { duration: 5000 });
          this.myForm.resetForm();
          this.createcompanyadmin.reset();
          this.selectedTab =0;

        });
    }
  }

  //-------------------------------password icon show hide-----------------------//
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
   //------------------------------------------search by name -------------------------------------//
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyArr.filter = filterValue.trim().toLowerCase();
}
//-------------------------------------------clear ----------------------------------------//
clear() {
  this.searchedText = ""
}


letterOnly(event:any){

  return /^[a-zA-Z ]+$/i.test(event.key)



}
}
