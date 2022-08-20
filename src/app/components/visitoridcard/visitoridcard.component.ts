import { Component, Inject, OnInit,ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from '../../server/global.service';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-visitoridcard',
  templateUrl: './visitoridcard.component.html',
  styleUrls: ['./visitoridcard.component.css']
})
export class VisitoridcardComponent implements OnInit {
  @ViewChild('visitorPass') visitorPass:ElementRef;
  @ViewChild('canvas') canvas:ElementRef;
  @ViewChild('downloadLink') downloadLink:ElementRef;
	


  imageBinary: any;
    constructor(public router: Router, @Inject(MAT_DIALOG_DATA) public data: any, public global: GlobalService) {
      this.imageBinary =`http://localhost:3000/file/fileinfo/${this.data.files}`
    }

  ngOnInit(): void {
  

  }
  	

clear() {
    this.router.navigate(['/header/checkin-out'])
  }
  downloadImage(){
    console.log("div---->",this.visitorPass);
  
     html2canvas(this.visitorPass.nativeElement).then((canvas:any) =>{
       this.canvas.nativeElement.src = canvas.toDataURL();
       this.downloadLink.nativeElement.href = canvas.toDataURL('image/jpeg');
       this.downloadLink.nativeElement.download = this.data.visitor_name + "_visitorPass";
       this.downloadLink.nativeElement.click();
  
     })
   }

  
  



}
