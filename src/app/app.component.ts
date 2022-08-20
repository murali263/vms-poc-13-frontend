import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MediaObserver,MediaChange} from '@angular/flex-layout'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'poc';
  mediasub: Subscription = new Subscription;
  deviceXs:any;
constructor(public mediaObserver:MediaObserver)  {

}
ngOnInit(): void {
  this.mediasub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
    this.deviceXs = result.mqAlias === 'xs'? true: false
  })
}
}
