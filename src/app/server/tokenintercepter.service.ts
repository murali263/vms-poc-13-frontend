import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TokenintercepterService implements HttpInterceptor {

  constructor(private _injector: Injector) { }
  intercept(req: { clone: (arg0: { setHeaders: { authorization: string; }; }) => any; },next: { handle: (arg0: any) => any; }){
    let authService = this._injector.get(GlobalService)
    let tokenizedRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${authService.gettoken()}`
      }
    })
    return next.handle(tokenizedRequest)
  }
}
