import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  public email: any
  public role: any
  public firstname: any
  public lastname: any
  public username: any 
  public phone: any 
  public showtopnav:boolean = true;
  public searchkeyword: any;
  public activated: any;
  public createdBy:any;
  
}
