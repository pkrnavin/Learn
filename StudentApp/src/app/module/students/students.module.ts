import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

import { StudentsRoutingModule } from './students-routing.module';

import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentGridComponent } from './student-grid/student-grid.component';
import { ModalStudentHistoryDetailsComponent } from './modal-student-history-details/modal-student-history-details.component';
//import { LoadingComponent } from 'src/app/common/component/loading/loading.component';
import { SharedModule } from '../shared/shared.module';
//import { LoadingComponent } from 'src/app/common/component/loading/loading.component';

/** 
 * Note: 
 * - Modal window from component opens, 
 *    of the component to adds in both `@NgModule.declarations`, `@NgModule.entryComponents` array working 
 * 
 * - LazyLoading, below tried  
 *    - to create `module` from the cmd prompt, which adds two files `module`, `routing` 
 *        - in `module`, to declare the page's component, import respective modules to add 
 *        - in `routing`, route path Component page to configure, 
 *        >> Note: in `routing`, routes paths are adds inside `forChild` method as feature module OR child component, 
 *           `forRoot` single place `app.module` to add 
 *    - in `app-routing.module` to configure the StudentDetails in `loadChildren` 
 *    - `StudentDetails` page uses Loading, Pagination, ErrorMessage common components to use in `AppModule`, `StudentModule` 
 *    >> Note: 
 *       - in `@NgModule.imports` only modules able to import (ie. the `<CLASS_NAME>` with decorator `@NgModule({...})`), 
 *         components are not imported, modules are imported 
 *       - the common components, to work in `StudentDetails`, `SharedModule` added, 
 *         in the `SharedModule` the compoennts intialize in `@NgModule.declarations` (ie. the component, directives, pipes to use in template, of this module, adds)
 *          `@NgModule.exports` (ie. in other modules, the given components uses)
 *       - `SharedModule` the module, includes `@NgModule.imports` of `AppModule`, `StudentModule` 
 *       - in `SharedModule` the component usage dependent modules are to add in import 
*/
@NgModule({
  declarations: [
    StudentDetailsComponent,
    StudentFormComponent,
    StudentGridComponent,
    ModalStudentHistoryDetailsComponent
  ],
  entryComponents: [
    ModalStudentHistoryDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
