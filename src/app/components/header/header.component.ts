import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../../server/generic.service';
// import {MediaChange,MediaObserver} from '@angular/flex-layout'
import {MediaChange,MediaObserver} from '@angular/flex-layout'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navToggle: boolean = true;
  showtopnav: boolean = true;
  token: any;
  url: any;
  fname :any;
  lname:any;
  isExpanded = false;
  isShowing = true;
  role:any
  constructor(public generic: GenericService, public router: Router) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.generic.showtopnav = true;
    } else {
      this.generic.showtopnav = false;
    }
  }
  ngOnInit(): void {
      this.role = localStorage.getItem('role')
    this.fname= localStorage.getItem('fname');
    this.lname = localStorage.getItem('lname')
  }
  onChange(){
    this.isShowing=false
}
  onClick(){
    this.isShowing = true
  }
  //--------------------------logout ---------------------//
  logout() {
    localStorage.clear();
    this.generic.showtopnav = false;
    this.ngOnInit();
    this.router.navigate(['/login']);
  }
}
