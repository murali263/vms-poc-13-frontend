import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalService } from '../../server/global.service';
@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css'],
})
export class WebCamComponent implements OnInit {
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  img: any;
  btnLabel: string = 'Capture Image';
  imgblob: any;
  imgurl: any;
  // file: File;

  constructor(
    private domSanitizer: DomSanitizer,
    public global: GlobalService,
    public router:Router
  ) {}

  ngOnInit() {}
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }


  checkPermissions() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 300,
          height: 300,
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

  proceed() {
    console.log(this.previewImage)
    const file = this.DataURIToBlob(this.previewImage)
    const formData = new FormData();
    formData.append('avatar', file, 'image.jpg');
    console.log("aaaaaaaaaaa",formData);
    this.global.fileData(formData).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/header/visitor'])
      
    })
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
function b64(b64: any) {
  throw new Error('Function not implemented.');
}
