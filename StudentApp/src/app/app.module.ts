import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import { LogoImageTextComponent } from './common/component/logo-image-text/logo-image-text.component';
import { TestComponent } from './module/test/test.component';
import { TestPathParamComponent } from './module/test-path-param/test-path-param.component';
import { TestRouteChildComponent } from './module/test-route-child/test-route-child.component';
import { TestChildOverviewComponent } from './module/test-child-overview/test-child-overview.component';
import { TestChildSpecsComponent } from './module/test-child-specs/test-child-specs.component';
import { HomeComponent } from './module/home/home.component';
import { HttpConfigInterceptor } from './common/interceptor/httpInterceptors/httpconfig.interceptor';
import { UserComponent } from './module/user/user.component';
import { HeaderComponent } from './module/header/header.component';
//import { ValueEmptyPipe } from './common/pipe/value.empty.pipe';
import './common/extend/form.control.extend';
//import { ErrorMessageComponent } from './common/component/error-message/error-message.component';
//import { NgInitDirective } from './common/directive/nginit/ng-init.directive';
import { NgInit } from './common/directive/nginit/ng-init';
import { ChildComponent } from './module/child/child.component';
//import { PaginationComponent } from './common/component/pagination/pagination.component';
//import { LoadingComponent } from './common/component/loading/loading.component';
import { SharedModule } from './module/shared/shared.module';

//import '../../../assets/js/messageBox.js'

//declare var showMessage: any; // variable as the name of the function inside messageBox.js

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoImageTextComponent,
    TestComponent,
    TestPathParamComponent,
    TestRouteChildComponent,
    TestChildOverviewComponent,
    TestChildSpecsComponent,
    HomeComponent,
    UserComponent,
    HeaderComponent,
    NgInit,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
