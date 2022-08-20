import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material/material.module';
import {myrouting} from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {GlobalService}from '../app/server/global.service';
import {GenericService} from '../app/server/generic.service';
import {HttpClientModule, HTTP_INTERCEPTORS,HttpClient,HttpHeaders} from '@angular/common/http';
import {AuthGuard} from '../app/guards/auth.guard'
import { TokenintercepterService } from './server/tokenintercepter.service';
import { HeaderComponent } from './components/header/header.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LeftSidenavComponent } from '../app/components/left-sidenav/left-sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UsernameValidatorsDirective } from '../app/directives/username-validators.directive';
import { AadharValidatorsDirective } from '../app/directives/aadhar-validators.directive';
import { MatTimepickerModule } from 'mat-timepicker';
import { WebCamComponent } from '../app/components/web-cam/web-cam.component';
import { VisitoridcardComponent } from './components/visitoridcard/visitoridcard.component';
import { WebcamModule } from 'ngx-webcam';
import { SampleComponent } from './components/sample/sample.component';
import { GeneralvisitortabComponent } from './components/generalvisitortab/generalvisitortab.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { EventorganiserstabComponent } from './components/eventorganiserstab/eventorganiserstab.component';
import { LabourertabComponent } from './components/labourertab/labourertab.component';
import {NgxPrintModule} from 'ngx-print';
import { NgOtpInputModule } from 'ng-otp-input';
@NgModule({
  declarations: [
    AppComponent,
    myrouting,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    LeftSidenavComponent,
    UsernameValidatorsDirective,
    AadharValidatorsDirective,
    WebCamComponent,
    VisitoridcardComponent,
    SampleComponent,
    GeneralvisitortabComponent,
    VendorComponent,
    EventorganiserstabComponent,
    LabourertabComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTimepickerModule,
    WebcamModule,
    NgxPrintModule,
    NgOtpInputModule

  ],
  providers: [
    GlobalService,
    GenericService,
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenintercepterService,
      multi:true
    }
  ],
 
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
 
})
export class AppModule { }
