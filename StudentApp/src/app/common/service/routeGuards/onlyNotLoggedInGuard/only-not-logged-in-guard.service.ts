import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../userService/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlyNotLoggedInGuardService implements CanActivate {
  
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  /**
   * page to display, for user not loggedIn (ie. URL `/login` page)
   * - (1) redirect to `HomeComponent` 
   * 
   * to view pages, of user not loggedIn (ie. login, userSignUp, ForgotPassword,) 
   * - (1) user not loggedin, activate route 
   * - (2) user loggedin, not activate route, redirect to `home` page 
   * - (2.1) Login page `Welcome` message to show, `getLoginUserDetails` add in `UserComponent` `ngOnInit`, 
   *       of `userLoggedIn` page refresh of URL `empty` OR `/login`, below loads `isSessionExists`, 
   *       of session exists redirect to `/user/home` page, `RouteGuard` `OnlyLoggedInUsersGuardService` `isUserLoggedInRtnObservable` loads of value not available of `userDetails` would return to `/login`, 
   *       so `getLoginUserDetails` to load redirect to `/user/home` page adds 
   * Note: Observable handles, of while loading `getUserDetails` `isUserLoggedIn` calls, to wait of response comes `Subject` Observables, tried 
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //console.info('OnlyNotLoggedInGuardService <> canActivate() <> 5555555 <> this.router.url: '+this.router.url);
    
    /* commented, `isSessionExists` to add, of `/login` page to try */
    return this.userService.isUserLoggedInRtnObservable().pipe(
              map(bUserLoggedIn => {
    /* commented, above adds; URL in `studentDetails` page refresh, redirect to `home` 
    return this.userService.isSessionExists().pipe(
              map(joResp => {
                let bUserLoggedIn = joResp.success;*/

                //console.info('OnlyNotLoggedInGuardService <> isSessionExists() <> joResp: '+JSON.stringify(joResp));
                //console.info('OnlyNotLoggedInGuardService <> isUserLoggedInRtnObservable() pipe 666666 <> bUserLoggedIn: '+bUserLoggedIn);

                if ( ! bUserLoggedIn ) {  // (1)
                  //console.info('OnlyNotLoggedInGuardService <> route activate <> 77777');
                  return true;
                } else {  // (2)
                  //console.info('OnlyNotLoggedInGuardService <> route not activate <> UserLoggedIn redirect home <> 88888');
                  //this.userService.getLoginUserDetails();  // (2.1)

                  this.router.navigate(["user", "home"]);
                  return false; 
                }
              })
            );
  }
}
