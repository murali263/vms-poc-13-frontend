import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../server/global.service';
import { MatDialog } from '@angular/material/dialog';
import { LeftSidenavComponent } from '../left-sidenav/left-sidenav.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VisitoridcardComponent } from '../visitoridcard/visitoridcard.component';
@Component({
  selector: 'app-checkin-out',
  templateUrl: './checkin-out.component.html',
  styleUrls: ['./checkin-out.component.css'],
})
export class CheckinOutComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize = 5;
  pageIndex = 0;
  totalCount: number;
  data: any;
  test:any;
  test1:any
  searchedText: String = '';
  companyArr: MatTableDataSource<any>;
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
    'Check In/Out',
  ];
  value: any = [];
  visitType: any ;
  constructor(
    public global: GlobalService,
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit() {
    this.onchangePagesize(this.pageSize, this.pageIndex);
    
  }
  //----------------------------get visitor---------------------------------//
  onchangePagesize(pageSize: number, pageIndex: number) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;

    this.getvisitor(false);
  }
  getvisitor(paginate?: any) {

    let payload: any = {};
    payload.pageSize = this.pageSize;
    payload.pageIndex = this.pageIndex;
    payload.visitType = "ALL";
    this.global.visitorgetk(payload).subscribe(
      (res: any) => {
        this.totalCount = res.body.total;
       console.log(this.totalCount)
      console.log(res.body.responseData);
    
          this.test = res.body.responseData
         
       this.test1 =this.test.filter((company: any) => {
      ;
            if (company.checkout && company.checkout == 'false') {
              return company;
            } else {
              return !Object.keys(company).includes('checkout');
            }
          });
          // console.log('----------------',this.test1)
         
          this.companyArr = this.test;
          // this.companyArr =res.body.responseData


          this.companyArr = new MatTableDataSource(this.test1);
          this.value = this.test;
        

        if (paginate) {
          this.companyArr.paginator = this.paginator;
        }
        // this.companyArr.paginator = this.paginator;
        // this.companyArr = data?.res;
        // this.companyArr = new MatTableDataSource(data?.res);
        // this.tableData=data?.res;
        // this.companyArr.paginator = this.paginator;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //-------------------------------------check in -------------------------------//

  checkinupdate(data: any) {
    const dialogRef = this.dialog.open(LeftSidenavComponent, {
      width: '600px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'updated') {
        this.dialog.open(VisitoridcardComponent, {
          width: '600px',
          height:'600px',
          data: data,
        });
        this.getvisitor();
      }
    });
  }
  //---------------------------------------check out -----------------------------------//
  checkoutupdate(obj: any) {
    console.log('inside checkout');

    this.global.visitorcheckout(obj).subscribe(
      (data: any) => {
        if ((data['res'] = 'update')) {
          this.getvisitor();
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
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
}
