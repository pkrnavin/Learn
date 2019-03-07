import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../../userService/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardService implements CanActivate {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  /**
   * TODO: guard to add, `userLoggedIn` redirect to the route 
   */

  
  /**
   * interface to impletement, 
   * - (0), redirect to `/login` page to add  
   * 
   * to view pages, of based on `userLoggedIn` 
   * - (1) user loggedIn, route activate 
   * - (2) user not loggedIn, route not activate, redirect to login page 
   * Note: Observables handles, as while loading `getUserDetails` `isUserLoggedIn` calls, to wait of response comes `Subject` Observables, tried 
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //console.log("OnlyLoggedInUsers <> canActivate() <> 11111");
    //console.info('state.url: '+state.url);
    
    //console.info('OnlyLoggedInUsersGuardService <> canActivate() <> 111111');
    
    return this.userService.isUserLoggedInRtnObservable().pipe(
              map(bUserLoggedIn => {
                //console.info('OnlyLoggedInUsersGuardService <> isUserLoggedInRtnObservable() pipe 22222 <> bUserLoggedIn: '+bUserLoggedIn);
                
                if ( bUserLoggedIn ) {  // (1)
                  //console.info('OnlyLoggedInUsersGuardService <> route activate <> 333333');
                  return true;
                } else {  // (2)
                  //console.info('OnlyLoggedInUsersGuardService <> route not activate <> 444444');
                  this.router.navigate(["login"]);
                  return false;
                }
              })
            );
  }
}