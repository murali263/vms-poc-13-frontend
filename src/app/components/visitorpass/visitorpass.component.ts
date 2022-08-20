import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../server/global.service';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-visitorpass',
  templateUrl: './visitorpass.component.html',
  styleUrls: ['./visitorpass.component.css'],
})
export class VisitorpassComponent implements OnInit {
  currentTime: any;
  time: string;
  public show: boolean = false;
  public shown: boolean = false;
  public Organizer: boolean = false;
  public Labourer: boolean = false;
  showMembers: boolean = false;
  visitorType: any;

  minDate = new Date();
  referralname: any;
  vendor: boolean = false;
  visitor: boolean = false;
  eventorganizer: boolean = false;
  laborer: boolean = false;
  @ViewChild('timepicker1') timepicker1: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('vistorsForm', { static: false }) vistorsForm: NgForm;
  color: ThemePalette = 'warn';
  selectedInTime: any;
  selectedTab: any;
  data: any;
  companyArr: any = [];
  searchedText: String = '';
  test: boolean = false;
  //-------------------------------------camera ---------------------------------//
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  img: any;
  btnLabel: string = 'Capture Image';
  imgblob: any;
  imgurl: any;
  // lunch_required:any = 'Yes';
  //--------------------------------common validation-----------------------------------------//
  characterspattern = 'accept  alphanumeric only';
  displayedColumns: string[] = [
    'Visitor Name',
    'Phone Number',
    'Vehicle Number',
    'Visit Date',
    'Visit Time',
    'Visit To',
    'Visit From',
    'Members',
    'Visit Type',
    'CompanyName',
    'Refer To',
    'Role',
    'EventType',
    'ToDate',
    'FromDate'

  ];
  visittype = [
    { visitorstype: 'ALL' },
    { visitorstype: 'GeneralVisitor' },
    { visitorstype: 'Vendor' },
    { visitorstype: 'Organizer' },
    { visitorstype: 'Laborer' },
  ];
  visitorform: FormGroup;
  tableData: any;
  constructor(
    public fb: FormBuilder,
    public global: GlobalService,
    public snackbar: MatSnackBar,
    public router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.visitorget();
    this.buildForm();
    this.setNow();
    this.getreferraldata();
    // this.memberradio();
    // this.memberradioone();
  }
  selected() {}
  buildForm() {
    this.visitorform = this.fb.group({
      visitor_name: [''],

      createdBy: [
        localStorage.getItem('username')?.toString(),
        Validators.required,
      ],
      mobile: [''],
      refer_to: [''],
      CompanyName: [],
      ContactPerson: [''],
      Role: [''],
      EventType: [''],
      visitType: [this.fb.array([])],
      members: this.fb.array([]),
      memberscount: [''],
     

      vehicle_number: [''],

      visiting_from: [''],
      visit_date: [this.minDate],
      visit_time: [this.time],
      FromDate: [],
      ToDate: [''],
      Comment: [''],
      files:[],
    });
  }

  visitType(): FormArray {
    return this.visitorform.get('visitType') as FormArray;
  }

  newformone(): FormGroup {
    return this.fb.group({
      GeneralVisitor: '',
      Vendor: '',
      Organizer: '',
      Laborer: '',
    });
  }
  changecolom(val: string) {
    console.log(val, 'value');
    this.visitorType = val;
    this.visitorget();

    if (this.visitorType == 'GeneralVisitor') {
      console.log('inside');
      this.displayedColumns = [
        'Visitor Name',
        'Phone Number',
        'Members',
        'Visit Date',
        'Visit Time',
        'Visit From',
        'Refer To',
        'Vehicle Number',
        'Visit Type',
      ];
    } else if(this.visitorType == 'Vendor'){
      this.displayedColumns = [
        'Visitor Name',
        'CompanyName',
        'Phone Number',
        'Members',
        'Vehicle Number',
        'Visit Date',
        'Visit Time',
        'Visit To',
        'Visit From',
        'Refer To',
        
      ];

    } else if(this.visitorType == 'Organizer') {
      this.displayedColumns = [
        'Visitor Name',
        'CompanyName',
        'Phone Number',
        'Vehicle Number',
        'Visit Date',
        'Visit Time',
        'Visit To',
        'Visit From',
        'Members',
        'Visit Type',
        'Role',
        'EventType'
        
      ];
    }else if(this.visitorType == 'Laborer'){
      this.displayedColumns = [
        'Visitor Name',
        'CompanyName',
        'Phone Number',
        'Members',
        'Role',
        'Visit From',
        'EventType',
        'ToDate',
        'FromDate',
        'Vehicle Number',
        
      ];

    }
   
  }
  newtexto() {
    this.members().push(this.newformone());
  }
  //----------------------------------------------------get validations------------------------------------------------//
  get Comment() {
    return this.visitorform.get('Comment');
  }
  get visitor_name() {
    return this.visitorform.get('visitor_name');
  }
  get mobile() {
    return this.visitorform.get('mobile');
  }
  get refer_to() {
    return this.visitorform.get('refer_to');
  }
  get CompanyName() {
    return this.visitorform.get('CompanyName');
  }
  get Role() {
    return this.visitorform.get('Role');
  }
  get EventType() {
    return this.visitorform.get('EventType');
  }
  get memberscount() {
    return this.visitorform.get('memberscount');
  }
  get vehicle_number() {
    return this.visitorform.get('vehicle_number');
  }
  get visiting_from() {
    return this.visitorform.get('visiting_from');
  }
  get FromDate() {
    return this.visitorform.get('FromDate');
  }
  get ToDate() {
    return this.visitorform.get('ToDate');
  }
  get ContactPerson() {
    return this.visitorform.get('ContactPerson');
  }

  //----------------------------------------------end get validations---------------------------------------------------//
  memberradio(val: any) {
    // console.log('test', val);
    if (val == 1) {
      if(val==0 || val==1||val==2||val==3){
        alert('Do You Want Select Vendor Visit Type ?')
        // this.vistorsForm.resetForm();
        //   this.visitorform.reset();
      }
      this.Comment?.setValidators([Validators.required]);
      this.mobile?.setValidators([ Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),]);
      this.CompanyName?.clearValidators();
      this.Role?.clearValidators();
      this.EventType?.clearValidators();
      this.ContactPerson?.clearValidators();
      this.CompanyName?.clearValidators();
      this.show = true;
      this.shown = false;
      this.Organizer = false;
      this.Labourer = false;
    } else if (val == 0) {
      if(val==0){
        alert('Do You Want Select General Visit Type ?')
        // this.vistorsForm.resetForm();
        //   this.visitorform.reset();
      }
      this.visitor_name?.setValidators([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ]);
      this.Comment?.setValidators([Validators.required]);
      this.mobile?.setValidators([ Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),]);
      this.ContactPerson?.setValidators([Validators.required]);
      this.CompanyName?.setValidators([Validators.required]);
      this.show = false;
      this.shown = true;
      this.Organizer = false;
      this.Labourer = false;
    } else if (val == 2) {
      if(val==2){
        alert('Do You Want Select Event Organiger Visit Type ?')
        // this.vistorsForm.resetForm();
        //   this.visitorform.reset();
      }
      this.Comment?.setValidators([Validators.required]);
      this.CompanyName?.setValidators([Validators.required]);
      this.Role?.setValidators([Validators.required]);
      this.EventType?.setValidators([Validators.required]);
      this.ContactPerson?.setValidators([Validators.required]);

      this.mobile?.setValidators([ Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),]);
      this.visitor_name?.clearValidators();
      this.Organizer = true;
      this.show = false;
      this.shown = false;
      this.Labourer = false;
    } else if (val == 3) {
       if(val==0 || val==1||val==2||val==3){
        alert('Do You Want Select Laborer Visit Type ?')
        // this.vistorsForm.resetForm();
        //   this.visitorform.reset();
      }
      this.Comment?.setValidators([Validators.required]);
      this.CompanyName?.setValidators([Validators.required]);
      this.Role?.setValidators([Validators.required]);
      this.EventType?.setValidators([Validators.required]);
      this.ContactPerson?.setValidators([Validators.required]);
      this.mobile?.setValidators([ Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),]);
      this.visitor_name?.clearValidators();
      this.show = false;
      this.shown = false;
      this.Organizer = false;
      this.Labourer = true;
    }

    // this.show = !this.show;
    // this.shown = false;
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
 
  selectInTime(value: string) {
    if (value !== '') {
      this.selectedInTime = value;
    }
  }

  //-------------------------------------- Referral---------------------//

  getreferraldata() {
    // console.log('hello i am from referal');
    this.global.getreferal().subscribe(
      (res) => {
        this.referralname = res;
        // console.log(this.referralname);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //------------------------------------
  setNow() {
    let now = new Date();
    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    let str = hours + ':' + minutes;
    this.time = str;
  }

  //------------------------------------visitor insert-----------------------------//
  tabChange(event: any) {
    // on tab change
    this.selectedTab = event;
    if (this.selectedTab === 0) {
      this.visitorget();
    } else if (this.selectedTab === 1) {
      this.buildForm();
      this.visitorget()
    }
  }
  addcaptureimg(){
    this.router.navigate(['/webcam'])
  }
  visitorinsert() {
    console.log(this.visitorform.value);
    if (this.visitorform.invalid) {
      this.snackbar.open('Please Enter Fields', 'ok', { duration: 5000 });
    }
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
            //this.vistorsForm.resetForm();
            this.visitorform.reset();
            this.selectedTab = 0;
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
  visitorget() {
    this.global.visitorget().subscribe(
      (data: any) => {
        console.log('table', data);
        if (this.visitorType == 'ALL' || !this.visitorType) {
          this.companyArr = data;
        } else {
          this.companyArr = data.filter((x: any) => {
            return x.visitType == this.visitorType;
          });
        }
        

        this.companyArr = new MatTableDataSource(this.companyArr);
        this.tableData = data;
        this.companyArr.paginator = this.paginator;
        this.companyArr.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addText() {}
  //------------------------------------------tab move----------------------------------------//

  //------------------------------------------search by name -------------------------------------//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyArr.filter = filterValue.trim().toLowerCase();
  }

  //-------------------------------------------clear ----------------------------------------//
  clear() {
    this.searchedText = '';
  }

  notAllowed(input: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = input.test(control.value);
      return forbidden ? { notAllowed: { value: control.value } } : null;
    };
  }

  //-------------------------------letters ------------------------------//
  letterOnly(event: any) {
    return /^[a-zA-Z ]+$/i.test(event.key);
  }














  //-------------------------------------camera funtionlity-------------------------//
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

  // proceed() {
  //   console.log(this.previewImage)
  //   const file = this.DataURIToBlob(this.previewImage)
  //   const formData = new FormData();
  //   formData.append('avatar', file, 'image.jpg');
  //   console.log("aaaaaaaaaaa",formData);
  //   this.global.fileData(formData).subscribe((res)=>{
  //     console.log(res);
  //     this.router.navigate(['/header/visitor'])
      
  //   })
  // }

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
