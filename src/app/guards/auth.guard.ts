import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../server/global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private global: GlobalService, private router: Router) {}
  canActivate(): boolean {
    if(this.global.isLoggedIn()){
      return true
    }
    else{
      this.router.navigate(['/login'])
      return false;
    }
  }
}
