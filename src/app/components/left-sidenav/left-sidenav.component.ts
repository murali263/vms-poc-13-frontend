import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../../server/global.service';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.css']
})
export class LeftSidenavComponent implements OnInit {

  constructor(public global:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any,
  public snackbar:MatSnackBar,public fb:FormBuilder,public dialogRef:MatDialogRef<LeftSidenavComponent>,) { }
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
  verificationCode:any;
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
  
  };

  ngOnInit(): void {
  }
  // otpform = this.fb.group({
  //   verificationCode: ['', Validators.required],
  // });


  updateintime() {
    console.log('helo',this.verificationCode)
     let inputData = {mobile:  this.data.mobile, verificationCode: this.verificationCode}
      if (this.data.verificationCode == this.verificationCode) {
        this.global.visitorcheckin(inputData).subscribe((data:any) => {
        });
          this.dialogRef.close('updated');
          this.snackbar.open('Checkin Successfull', 'ok', { duration:2000 });
        }
        else{
          this.snackbar.open('Please enter valid 4-digit otp number', 'ok', { duration:2000 });
        }
      }

      onOtpChange(event:any){
        console.log('helo',event)
        this.verificationCode = event;

      }
   
  
}
