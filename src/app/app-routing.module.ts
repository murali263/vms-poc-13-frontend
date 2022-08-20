import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompanyadminComponent} from './components/companyadmin/companyadmin.component';
import {CheckinOutComponent} from './components/checkin-out/checkin-out.component';
import {GuardComponent} from './components/guard/guard.component';
import {VisitorpassComponent} from './components/visitorpass/visitorpass.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard'
import { HeaderComponent } from './components/header/header.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { VisitoridcardComponent } from './components/visitoridcard/visitoridcard.component';
import { WebCamComponent } from './components/web-cam/web-cam.component';
import { SampleComponent } from './components/sample/sample.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:'dashboard',component:DashboardComponent,
    canActivate: [AuthGuard]

  },
  
  {
    path:'webcam',component:WebCamComponent
  },

  {
    path:'header',component:HeaderComponent,
    canActivate: [AuthGuard],children:[
      {
        path:'guard',component:GuardComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'companyadmin',component:CompanyadminComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'visitorsample',component:VisitorpassComponent,
        canActivate: [AuthGuard]
        
      },
      {
        path:'visitor',component:SampleComponent,
        canActivate: [AuthGuard]
        
      },
      {
        path:'checkin-out',component:CheckinOutComponent,
       canActivate: [AuthGuard]
      },
      

    ]
  },
  {
    path:'left-sidebar',component:LeftSidenavComponent,
    
  },
  {path:'visitorid',component:VisitoridcardComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const myrouting = [
CheckinOutComponent,
GuardComponent,
CompanyadminComponent,
VisitorpassComponent,
LoginComponent,
HeaderComponent

]
