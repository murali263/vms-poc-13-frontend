import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlDirective, FormGroupDirective, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../server/global.service';
@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.css'],
})
export class GuardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  selectedTab: any;
  hide: boolean = true;
  searchedText: String = '';
  //-------------------------username validation messages----------------------//
  emptyUserName =  'Please enter a username';
  minlengthUserName = 'user name must be at least 3 characters long';
  maxlengthUserName = 'username cannot exceed 20 characters';
  userNamePattern = 'username should be in alphanumeric only';
  //-----------------------phone number validation messages----------------------//
  emptyPhoneNumber = 'You must enter a phonenumber';
  maxlengthPhoneNumber = 'phonenumber cannot exceed 10 characters';
  minlengthPhoneNumber = 'phonenumber must be at least 3 characters long';
  PhoneNumberPattern = 'phonenumber should be in numericals only';
  //---------------------------------zipcode---------------------------------------------//
  maxlengthzip = 'maxlength must be at least 6 characters';
  zipPattern = 'Zipcode should be in numericals only';
  //--------------------------------common validation-----------------------------------------//
  characterspattern = 'accept  alphanumeric only';
  //-------------------------password-----------------------------------------------//

  minlengthpassword = 'password must be at least 5 characters long';
  maxlengthpassword = 'password cannot exceed 7 characters';
  passwordPattern = 'password  should contains Eg:(Abc@123)';
  //-----------------------------------------------------------------------------------------//
  AdharNumberPattern='Invalid Aadhar Number';
  displayedColumns: string[] = [
    'Guard Name',
    'Phone Number',
    'Email',
    'City',
    'Pin Code',
  ];
  tableData:any = [];
  data: any;
  companyArr: MatTableDataSource<any>;
  guardform:FormGroup;
  constructor(
    private fb: FormBuilder,
    private global: GlobalService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getguard();
    this.buildForm();
  }
  buildForm(){

  this.guardform = this.fb.group({
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
    createdBy: [
      localStorage.getItem('username')?.toString(),
      Validators.required,
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
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    ],
    role: ['guard', Validators.required],
    
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

  //---------------------------------------------------post guard---------------------------------//

  tabChange(event: any) {
    // on tab change
    this.selectedTab = event;
    if (this.selectedTab === 0) {
      this.getguard();
    } else if (this.selectedTab === 1) {
      this.buildForm();
    }
  }

  createguard() {
    if (this.guardform.invalid) {
      this.snackbar.open('Please Enter Fields', 'ok', { duration: 5000 });
    }
    if (this.guardform.valid) {
      this.global.createrole(this.guardform.value).subscribe(
        (res:any) => {

          this.snackbar.open('successfully Created', 'ok', { duration: 5000 });
          this.myForm.resetForm();
          this.guardform.reset();
          this.selectedTab =0;
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }
  //--------------------------------------------get guard-------------------------------//
  getguard() {
    this.global.getguardlist().subscribe((data: any) => {


      this.companyArr = data?.res;
      this.companyArr = new MatTableDataSource(data?.res);
      this.tableData=data?.res;
      this.companyArr.paginator = this.paginator;
      // this.tableData=this.companyArr


   


    });
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
