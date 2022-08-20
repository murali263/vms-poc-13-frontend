import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../server/global.service';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
})
export class SampleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('myForm', { static: false }) myForm: NgForm;
  @ViewChild('timepicker1') timepicker1: any;

  selectedTab: any;
  hide: boolean = true;
  searchedText: String = '';

  displayedColumns: string[] = [
    'Visitor Name',
    'Phone Number',
    'Vehicle Number',
    'Visit Date',
    'Visit Time',
    // 'Visit To',
    'Visit From',
    'Members',
    'Visit Type',
    // 'CompanyName',
    // 'Refer To',
    // 'Role',
    // 'EventType',
    // 'ToDate',
    // 'FromDate'
  ];
  visittype = [
    { visitorstype: 'ALL' },
    { visitorstype: 'GeneralVisitor' },
    { visitorstype: 'Vendor' },
    { visitorstype: 'EventOrganizer' },
    { visitorstype: 'Labourer' },
  ];
  tableData: any = [];
  data: any;
  companyArr: any = MatTableDataSource;

  //--------------------------new variables---------------------//
  minDate = new Date();
  selectedInTime: any;
  currentTime: any;
  time: string;
  visitorType: any;
  pageSize = 5;
  pageIndex = 0;
  totalCount: number;

  constructor(private global: GlobalService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    // this.buildForm();

    this.onchangePagesize(this.pageSize, this.pageIndex);
    // this.visitorget()
  }
  onchangePagesize(pageSize: number, pageIndex: number) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;

    this.visitorget(false);
  }

  //--------------------------------------common functions------------------------------------//
  changecolom(val: string) {
    // console.log(val, 'value');
    this.visitorType = val;

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
    } else if (this.visitorType == 'Vendor') {
      this.displayedColumns = [
        'Visitor Name',
        'CompanyName',
        'Phone Number',
        'Members',
        'Vehicle Number',
        'Visit Date',
        'Visit Time',
        // 'Visit To',
        'Visit From',
        'Refer To',
      ];
    } else if (this.visitorType == 'Organizer') {
      this.displayedColumns = [
        'Visitor Name',
        'CompanyName',
        'Phone Number',
        'Vehicle Number',
        'Visit Date',
        'Visit Time',
        // 'Visit To',
        'Visit From',
        'Members',
        'Visit Type',
        'Role',
        'EventType',
      ];
    } else if (this.visitorType == 'Laborer') {
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
    this.visitorget();
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
  tabChange(event: any) {
    // on tab change
    this.selectedTab = event;
    if (this.selectedTab === 0) {
      this.visitorget();
    } else if (this.selectedTab === 1) {
      // this.buildForm();
    }
  }

  //------------------------------------------search by name -------------------------------------//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyArr.filter = filterValue.trim().toLowerCase();
  }
  //-------------------------------------------clear ----------------------------------------//
  clear() {
    this.searchedText = '';
  }

  visitorget(paginate?: any) {
    if (!this.visitorType) {
      this.visitorType ="ALL"

    }
    let payload: any = {};
    payload.pageSize = this.pageSize;
    payload.pageIndex = this.pageIndex;
    payload.visitType = this.visitorType;
    this.global.visitorgetk(payload).subscribe(
      (data: any) => {
        this.totalCount = data.body.total;
        if (this.visitorType == 'ALL' || !this.visitorType) {
          console.log('---------------------visittype', this.visitorType);
          this.companyArr = data.body.responseData;
        } else {
          this.companyArr = data.body.responseData.filter((x: any) => {
            console.log(x);
            return x.visitType == this.visitorType;
          });
        }

        this.tableData = this.companyArr;

        this.companyArr = new MatTableDataSource(<any>this.companyArr);
        // this.companyArr.paginator = this.paginator;
        if (paginate) {
          this.companyArr.paginator = this.paginator;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
