
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { GlobalService } from '../../server/global.service';

@Component({
  selector: 'app-eventorganiserstab',
  templateUrl: './eventorganiserstab.component.html',
  styleUrls: ['./eventorganiserstab.component.css']
})
export class EventorganiserstabComponent implements OnInit {
visitorform:FormGroup;
minDate = new Date();
selectedInTime: any;
currentTime: any;
time: string;
visitorType: any;
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
 characterspattern = 'accept  alphabets only';
 //-------------------------password-----------------------------------------------//

 minlengthpassword = 'password must be at least 5 characters long';
 maxlengthpassword = 'password cannot exceed 7 characters';
 passwordPattern = 'password  should contains Eg:(Abc@123)';
 //-----------------------------------------------------------------------------------------//
 AdharNumberPattern='Invalid Aadhar Number';



  //-------------------------------------camera ---------------------------------//
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  img: any;
  btnLabel: string = 'Capture Image';
  imgblob: any;
  imgurl: any;
  sort: any;
  referralname: any;
  constructor(public fb:FormBuilder,public global:GlobalService,public snackbar:MatSnackBar,public router:Router) { }

  ngOnInit(): void {
    this.setNow()
    this.buildForm()
    this.getreferraldata()
  }
  letterOnly(event:any){

    return /^[a-zA-Z ]+$/i.test(event.key)
  
  }
  members(): FormArray {
    return this.visitorform.get('members') as FormArray;
  }
  
  newform(): FormGroup {
    return this.fb.group({
      membername: '',
    });
  }
  
  newtext() {
    this.members().push(this.newform());
  }
  remove(i: number){
    this.members().removeAt(i)
  }
  setNow() {
    let now = new Date();
    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    let str = hours + ':' + minutes;
    this.time = str;
  }
  selectInTime(value: string) {
    if (value !== '') {
      this.selectedInTime = value;
    }
  }
  getreferraldata() {
    // console.log('hello i am from referal');
    this.global.getreferal().subscribe(
      (res) => {
        this.referralname = res;
        console.log(this.referralname);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }
  checkPermissions() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 200,
          height: 200,
        },
      })
      .then((res) => {
        console.log('response', res);
        this.stream = res;
        this.status = 'My camera is accessing';
        this.btnLabel = 'Capture Image';
      })
      .catch((err) => {
        console.log(err);
        if (err?.message === 'Permission denied') {
          this.status =
            'Permission denied please try again by approving the access';
        } else {
          this.status =
            'You may not having camera system, Please try again ...';
        }
      });
  }
 

  captureImage() {
    this.trigger.next();
  }

  snapshot(event: WebcamImage) {
    this.previewImage = event.imageAsDataUrl;
    console.log(this.previewImage);   
  }
  buildForm() {
    this.visitorform = this.fb.group({
      visitor_name: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ])],
      CompanyName:['',Validators.required],
      createdBy: [
        localStorage.getItem('username')?.toString(),
        Validators.required,
      ],
      mobile: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ]],
    
      vehicle_number: [''],
      members: this.fb.array([]),
      files:[],
      Role: ['',Validators.required],
      EventType: ['',Validators.required],
      visit_date: [this.minDate],
    visit_time: [this.time],
    Comment: ['',[Validators.required]],
    visitType:['EventOrganizer',Validators.required],
     
      
      
    });
  }
  createvisitor(){
    if(this.visitorform.invalid){
      this.snackbar.open('Please Enter Fields', 'ok', { duration: 5000 });
    }
    
      console.log(this.visitorform.value)
      if (this.visitorform.valid) {
        console.log(this.previewImage)
        const file = this.DataURIToBlob(this.previewImage)
        const formData = new FormData();
        formData.append('avatar', file, 'image.jpg');
        console.log("aaaaaaaaaaa",formData);
        this.global.fileData(formData).subscribe((res:any)=>{
          console.log(res);
          let temp = this.visitorform.value;
          temp.files = res['data'];
        if(res){
          this.global.visitorinsert(temp).subscribe(
            (res: any) => {
              // console.log(res);
              
              
              this.snackbar.open('successfull created', 'ok', {
                duration: 3000,
                panelClass: ['blue-snackbar'],
              });
              this.reloadcomponent()
              // this.router.navigate(['header/checkin-out'])
              // this.router.navigate(['/header/visitor'])
              //this.vistorsForm.resetForm();
              this.visitorform.reset();
              // this.selectedTab = 0;
              //this.router.navigate(['/webcam'])
           
              if (res.success == false) {
                this.snackbar.open(res.message, 'ok', {
                  duration: 3000,
                  panelClass: ['blue-snackbar'],
                });
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }  
        })
      }
  }
  reloadcomponent() {
    let currenturl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currenturl]);
    });
  }
  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
  
    return new Blob([ia], { type: mimeString });
  }
}
