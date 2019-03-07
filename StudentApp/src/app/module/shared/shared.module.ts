import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedRoutingModule } from './shared-routing.module';
import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { ErrorMessageComponent } from 'src/app/common/component/error-message/error-message.component';
import { ValueEmptyPipe } from 'src/app/common/pipe/value.empty.pipe';
import { PaginationComponent } from 'src/app/common/component/pagination/pagination.component';
import { NgInitDirective } from 'src/app/common/directive/nginit/ng-init.directive';

/**
 * Lazy loading of student module adds tried, 
 * - in `StudentDetails` page common components of Loading, ErrorMessage, Pagination using, 
 *    the components to declare in `@NgModule.declarations`, `@NgModule.exports` 
 *    `@NgModule.declarations` the components to use in the module to declare, 
 *    `@NgModule.exports` the declared compoents to use in othe modules, in exports to declare 
 * - the components dependent modules are to add in imports 
 * - the `SharedModule` are add in `@NgModule.import` of `AppModule`, `StudnetModule` 
*/
@NgModule({
  declarations: [
    LoadingComponent,
    ErrorMessageComponent,
    ValueEmptyPipe,
    PaginationComponent,
    NgInitDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    SharedRoutingModule
  ],
  exports: [
    LoadingComponent,
    ErrorMessageComponent,
    ValueEmptyPipe,
    PaginationComponent,
    NgInitDirective
  ]
})
export class SharedModule { }
