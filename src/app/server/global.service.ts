import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // getToken() {
  //   throw new Error('Method not implemented.');
  // }
  // headerDict = {
  //   'Content-Type': 'application/json',
  //   // 'Accept': 'application/json',
  //   // 'Access-Control-Allow-Headers': 'Content-Type',
  //   // 'Access-Control-Allow-Origin':'*',
  //   // 'Access-Control-Allow-Headers': 'X-Requested-With',
  //   authorization: 'b8416f2680eb194d61b33f9909f94b9d',
  // };

  // requestOptions = {
  //   headers: new HttpHeaders(this.headerDict),
  // };
  constructor(public global: HttpClient) {}

  //----------------Login----------------//

  login(data: any) {
    return  this.global.post(`${environment.baseUrl}login`, data);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  gettoken() {
    localStorage.getItem('token');
  }

  //------------------------------visitor--------------------------------//
  visitorinsert(data: any) {
    return this.global.post(
      `${environment.baseUrl}visitor/visitordatainsert`,
      data
    );
  }
  visitorget() {
    return this.global.get(`${environment.baseUrl}visitor/visitordataget`);
  }
  visitorgetk(obj:any) {
    return this.global.post(`${environment.baseUrl}visitor/visitordata`,obj);
  }
  visitorcheckin(data:any){
  return this.global.post(`${environment.baseUrl}visitor/check_in`,data)
  
  }
  visitorcheckout(data:any){
  return this.global.put(`${environment.baseUrl}visitor/check_out`,data)
  }

  //-------------------------- guard,subadmin----------------------------//

  createrole(data: any) {
    return this.global.post(`${environment.baseUrl}create-users`, data);
  }
  getroledata() {
    return this.global.get(`${environment.baseUrl}gettinguser`);
  }
  getsubadminlist(){
   return this.global.get(`${environment.baseUrl}getUsers?role=subadmin`)
  }
  getguardlist(){
   return this.global.get(`${environment.baseUrl}getUsers?role=guard`)
  }



  //----------------------------checkin otp --------------------------------//






  //----------------------------referal api  start--------------------------------//
  getreferal(){
    return this.global.get(`${environment.baseUrl}refer/referget`)
   }
  //---------------------------- referal api end ---------------------------------//
  



  //-----------------------capture image upload ------------------------//
  fileData(obj:any){
    return this.global.post(`${environment.baseUrl}file/photos/upload` ,obj, {reportProgress:true});
  }
}
