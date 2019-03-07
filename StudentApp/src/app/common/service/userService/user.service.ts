import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigService } from '../appconfig/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private bLoadingUserDetails: boolean = false;
  joUserDetails: any;
  
  private subjUserLoggedIn = new Subject<boolean>();
  /* Note: userDetails to get as `Observable`, 
   *  as while loading in other components, calls to get value, 
   * thinks `BhevaiourSubject` OR `ReplaySubject` to add as value loaded, in component after times calls, to get last value 
   * -- after corrections tried  
   * Note: `BehaviorSubject` adds working (ie. gets last stores value),   
   * (ie. `getUserDetails` loads in `AppComponent` response calls in the response subject.next calls, 
   *      after loads `HeaderComponent` calls subscribe, not working, `BehaviorSubject` adds working as gets last value returns) 
  */
  //private subjUserDetails = new Subject<any>();
  private subjUserDetails = new BehaviorSubject<any>(this.joUserDetails);
  
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.info('UserService <> ngOnInit() <> 1111');
  };
  
  /**
   * to send boolean `userLoggedIn`
   * 
   * @param bUserLoggedIn 
   */
  sendSubjUserLoggedIn(bUserLoggedIn: any): void {
    this.subjUserLoggedIn.next(bUserLoggedIn);
  };

  /**
   * to get subj As Observable 
   */
  getSubjUserLoggedInAsObservable(): any {
    return this.subjUserLoggedIn.asObservable();
  };

  /**
   * to send user details 
   */
  sendSubjUserDetails(): void {
    this.subjUserDetails.next(this.joUserDetails);
  };

  /**
   * to get user details as subject observable, in other components value to get  
   */
  getUserDetailsAsSubjObservable(): any {
    return this.subjUserDetails.asObservable();
  };

  /**
   * TODO: to load `userLoggedInDetails` to get 
   * - below while route navigates, 
   *     `getUserLoggedInDetails` `isLoading = true` to return `Observable`, 
   *       else of `isLoading = false` direct boolean to return based value sets of userLoggedIn 
   */
  isLoggedIn(): boolean {
    //console.info('UserService <> isLoggedIn() <> 11111');
    return false;
    //return true;
  };

  /**
   * `isUserLoggedIn` Observable returns, of RouteGuard route to activate, 
   *   of page refresh `getUserDetails` calls, while loading the function calls, to handle tried 
   * 
   * - (1) while loading `getLoginUserDetails()`, to handles from `Subject` tried  
   * - (2) after loads of `getLoginUserDetails()`, variable value sets to returns 
   * - (3) TODO: below Observable to return, `RouteGuard` route activate of `userLoggedIn` 
   */
  isUserLoggedInRtnObservable(): Observable<boolean> {
    //console.info('isUserLoggedIn() <> 0000 <> this.bLoadingUserDetails: '+this.bLoadingUserDetails);
    
    if ( this.bLoadingUserDetails ) { // (1)
      //console.info('isUserLoggedIn() <> calls while loading <> Subject Observable below <> 111111');
      return this.getSubjUserLoggedInAsObservable();
    } else {  // (2)
      // (3)
      //console.info('isUserLoggedIn() <> 22222222 <> bUserLoggedIn: '+this.isUserLoggedInExists()+' <> this.bUserLoggedIn: '+this.bUserLoggedIn);
      ////console.info('22222 <> bUserLoggedIn: '+this.isUserLoggedInExists()+' <> this.bUserLoggedIn: '+this.bUserLoggedIn);
      return new Observable(observer => {
        observer.next(this.isUserLoggedIn());
      });
    }
  };
  
  /**
   * to check user loggedin details exists 
   * - (1) TODO: empty chcek Utils function to add, 
   */
  isUserLoggedIn(): boolean {
    return (! UtilsService.isValueEmpty(this.joUserDetails));
  };

  /**
   * gets login userDetails 
   * - (1) login Observable assign, Note: the Observable calls of `subscribe` adds 
   * - (1.1) before loads, clear user details adds, as response err, to clear 
   * - (2.0) sets login user details; Note: after value set send data object Observable calls, adds 
   * - (2.1) Observable data sends, of while laoding `getLoginUserDetails()`, the `isUserLoggedIn()` calls 
   * - (2.2) userDetails Observable data sends, to adds as in other component value loads to get value  
   * - (3) subscribe adds, Observable calls 
   * - (4.0) ajax call err occurs, to handles (ie. in `Login` page loads session expired 500 err returns, routeGuard calling observable to return) 
   * - (4.1) err occured `false` to sets adds; TODO to comment thinks, interceptor of error message to add, 
   */
  getLoginUserDetails(): any {
    let userDetailsObservable = this.getUserDetailsObservable();  // (1) 
    this.showLoadingUserDetails();
    //console.info('2222222 <> getLoginUserDetails()');

    this.clearUserDetails();  // (1.1)

    userDetailsObservable.subscribe(joResp => {
      this.hideLoadingUserDetails();

      this.setUserDetails(joResp.data.message); // (2.0)

      this.sendSubjUserLoggedIn(this.isUserLoggedIn()); // (2.1)

      this.sendSubjUserDetails(); // (2.2)
    }, err => { // (4.0)
      this.hideLoadingUserDetails();
      //console.info('getLoginUserDetails() <> err: '+err);
      //console.info('getLoginUserDetails() <> err: '+JSON.stringify(err));
      this.sendSubjUserLoggedIn(false); // (4.1)
    });
    
    // TODO: multiple subscribe adds, to checking multiple of `Observable` calls 
    //this.getUserDetailsObservable(); // (3)
    /* commented, `subscribe` adds `Observable` multiple times calls, to checking  
    userDetailsObservable.subscribe(joResp => {
      console.info('22222 <> MULTIPLE subscribe <> Observable calls to check');
    });*/
  };
  
  /**
   * to get user loggedin details 
   */
  private getUserDetailsObservable(): Observable<any> {
    /* commented, proxy config adds, to try 
    return this.http.post<any>(AppConfigService.UI_SERVICE_URL+'/getLoginUserDetails', {});*/
    return this.http.post<any>('/LearnUI/getLoginUserDetails', {});
  };

  /**
   * Observable to loads LoginUserDetails 
   * - (1) user loggedin details  
   * - (2) of user not loggedin 
   */
  private getUserDetailsObservableHardcoded(): any {
    return new Observable(observer => {
      //console.info('111111 <> loginUserDetails <> Observable');

      setTimeout(() => {
        let joUserDetails;
        //joUserDetails = {"success":true,"failure":false,"data":{"message":{"userId":1,"userName":"admin","fullName":"Admin","createdBy":1,"createdOnMillis":1536679578918,"modifiedBy":1,"modifiedOnMillis":1537981129651}}}; // (1)
        joUserDetails = {"success":true,"failure":false,"data": {"message": undefined}};  // (2)

        observer.next(joUserDetails);
      }, 1000);
    });
  };
  
  /**
   * to check session exists 
   */
  isSessionExists(): Observable<any> {
    return this.http.post<any>('/LearnUI/isSessionExists', {});
  };

  /** 
   * Angular `loginSession` servlet to work, below, 
   * Angular in `http://localhost:4200/`, backend service in Tomcat `http://localhost:8080/LearnUI/` 
   * - Backend service Full URL prefix in ajax call, below problem occurs 
   *    - CORS orgin domain 
   *    >> Filter servlet adds, to accept the request 
   *    - Login from ajax call, with full URL of backend service adds, `loginSession` session adds, of `getUserDetails` from ajax call session value not gets new session adds 
   *    >> from link tried, above login with session working, of `proxy.config.json` adds, in the file `pathRewrite` property commented working, the file to configure in `package.json` `ng serve` 
   *      (ie. Angular local WebPackDevServer, of URL startsWith `/LearnUI/` proxy prefix `http://localhost:8080` adds, login with session working)
   *       `https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/`
   *      Of Production deployment proxy respective to configures, 
   *      (ie. if both Angular, Backend service in `Tomcat` OR `Weblogic` respective to add; 
   *           if Angular, Backend service in separate server OR machine, Angular in `ngInix` OR `Apache2` proxy repsective to configure)
   * 
   * - Angular Login from token based, thinks below 
   *    - Login success JWT token from server response to return, in `localStorage` to add 
   *    - the JWT user's token to pass, of all user details ajax call (ie. server doesn't maintain session, stateless), 
   *    - of `logout`, from `localStorage` to clear the token, 
  */

  /**
   * user login 
   * 
   * @param email 
   * @param password 
   */
  login(email: string, password: string): Observable<any> {
    //console.info('login <> email: '+email+' <> password: '+password);

    let config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    const httpParams = UtilsService.getAsHttpParams({'txtUsername': email, 'txtPassword': password, 'fromLibCode': 'ANGULAR'});
    //console.info('httpParams: '+httpParams);
    
    return this.http.post<any>('/LearnUI/loginSession', httpParams);
  };
  
  logout(): Observable<any> {
    const httpParams = UtilsService.getAsHttpParams({'fromLibCode': 'ANGULAR'});

    return this.http.post<any>('/LearnUI/logoutSession', httpParams);
  };

  /**
   * set login user details 
   * Note: `private` adds accessible only to this class 
   * 
   * @param joUserDetails 
   */
  private setUserDetails(joUserDetails: any): void {
    this.joUserDetails = joUserDetails;
  };

  /**
   * clear login user details; 
   * Note: ajax call of response err, `SESSION_EXPIRED` to clear userDetails in interceptor, to redirect `/login`, to try 
   */
  clearUserDetails(): void {
    this.setUserDetails(undefined);
  };

  /**
   * gets user details 
   */
  public getUserDetails(): any {
    return this.joUserDetails;
  };

  showLoadingUserDetails() { this.bLoadingUserDetails = true; };
  hideLoadingUserDetails() { this.bLoadingUserDetails = false; };
}
