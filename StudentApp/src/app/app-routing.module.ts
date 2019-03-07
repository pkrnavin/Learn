import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { TestComponent } from './module/test/test.component';
import { TestPathParamComponent } from './module/test-path-param/test-path-param.component';
import { TestRouteChildComponent } from './module/test-route-child/test-route-child.component';
import { TestChildOverviewComponent } from './module/test-child-overview/test-child-overview.component';
import { TestChildSpecsComponent } from './module/test-child-specs/test-child-specs.component';
import { OnlyLoggedInUsersGuardService } from './common/service/routeGuards/onlyLoggedInUsersGuard/only-logged-in-users-guard.service';
import { HomeComponent } from './module/home/home.component';
import { OnlyNotLoggedInGuardService } from './common/service/routeGuards/onlyNotLoggedInGuard/only-not-logged-in-guard.service';
import { AlwaysAuthChildrenGuardService } from './common/service/routeGuards/alwaysAuthChildrenGuard/always-auth-children-guard.service';
import { UserComponent } from './module/user/user.component';
//import { StudentDetailsComponent } from './module/student-details/student-details.component';

/**
 * `redirectTo` available, must add `pathMatch` 
 *   (ie..  `pathMatch` to tell how to match URL to the path route; 
 *       the values of `pathMatch` `full`, `prefix`, based on the value `redirectTo` given URL to matches) 
 * - `path: ''`, redirect to login page 
 * - `path: '**'`, given URL not in route configure path, given component to display; Note: adds last value in `routes` working 
 */
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [OnlyNotLoggedInGuardService], data: { title: 'Login' } },
  //{ path: 'home', component: HomeComponent, canActivate: [OnlyLoggedInUsersGuardService] },
  { path: 'user', component: UserComponent, 
      canActivate: [OnlyLoggedInUsersGuardService],
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent, data: { title: 'Home' } },
        { path: 'studentDetails', loadChildren: './module/students/students.module#StudentsModule' }
        /* commented, lazy laoding to add to try 
        { path: 'studentDetails', component: StudentDetailsComponent, data: { title: 'StudentDetails' } },*/
      ]
  }, 
  { path: 'test', component: TestComponent, data: { title: 'Test' } },
  { path: 'testPathParam/:id', component: TestPathParamComponent, data: { title: 'TestPathParam' } },
  { path: 'testRouteChild/:id', component: TestRouteChildComponent, data: { title: 'TestRouteChild' },
      canActivate: [OnlyLoggedInUsersGuardService],
      canActivateChild: [AlwaysAuthChildrenGuardService],
      children: [
        { path: '', redirectTo: 'overview', pathMatch: 'full' },
        { path: 'overview', component: TestChildOverviewComponent },
        { path: 'specs', component: TestChildSpecsComponent }
      ]
  },
  //{ path: '**', component: LoginComponent }
  { path: '**', redirectTo: '/user/home', pathMatch: 'full' }
  //{ path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
