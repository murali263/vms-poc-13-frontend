import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GlobalService } from '../../server/global.service';
import { GenericService } from '../../server/generic.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token: any;
  storage: any;
  userObj: any;
  typeOfUser: any;
  hide = true;
  constructor(
    public fb: FormBuilder,
    public global: GlobalService,
    public genric: GenericService,
    public router: Router,
    public snackbar: MatSnackBar,
    public dataservice: GenericService
  ) {}

  ngOnInit(): void {
    // this.submit()
  }

  //-------------------------------validation of login------------------//
  userlogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  //-------------------login --------------------------------------------//

  submit() {

    if (this.userlogin.invalid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    if (this.userlogin.valid) {
      this.global.login(this.userlogin.value).subscribe(
        (res: any) => {

          if (res.message == 'logged in') {
            this.token = res.token;
            this.userObj = res?.user;

            this.typeOfUser = localStorage.getItem('role');
            if (this.userObj.role == 'superadmin') {
              localStorage.setItem('role', this.userObj.role);
              this.typeOfUser = localStorage.getItem('role');
              this.data();
              this.router.navigate(['/header/companyadmin']);
            } else if (
              this.userObj.role == 'guard' ||
              this.userObj.role == 'subadmin'
            ) {
              localStorage.setItem('role', this.userObj.role);
              this.typeOfUser = localStorage.getItem('role');
              this.data();
              this.router.navigate(['/header/checkin-out']);
            } else if (this.userObj.role == 'guard') {
              localStorage.setItem('role', this.userObj.role);
              this.typeOfUser = localStorage.getItem('role');
              this.data();
              this.router.navigate(['/header/checkin-out']);
            }
          } else {
            this.snackbar.open(res.message, 'ok', {
              duration: 3000,
              panelClass: ['blue-snackbar'],
            });
          }
        }

      );
    }
  }
  data() {
    localStorage.setItem('token', this.token);
    localStorage.setItem('email', this.userObj.email);
    localStorage.setItem('username', this.userObj.username);
    localStorage.setItem('role', this.userObj.role);
    localStorage.setItem('fname',this.userObj.fname);
    localStorage.setItem('lname',this.userObj.lname)
    this.dataservice.email = this.userObj.email;
    this.dataservice.firstname = this.userObj.fname;
    this.dataservice.lastname = this.userObj.lname;
    // this.dataservice.phone = this.userObj.phone;
    this.dataservice.role = this.userObj.role;
    this.dataservice.username = this.userObj.username;
  }
}
