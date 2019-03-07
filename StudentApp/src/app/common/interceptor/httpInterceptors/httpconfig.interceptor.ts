import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/userService/user.service';
import { SessionService } from '../../service/session/session.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private userService: UserService) {}

    /**
     * TODO: response error of `SESSION_EXPIRED`, redirect to login page 
     * - (1) response has error, 
     * - (1.1) clear user details, adds to redirect to `/login`, 
     *     redirects of RouteGuard calls `isUserLoggedInRtnObservable()`, based on user value in `userService` the URL route is activate, 
     * - (1.2) of page refresh URL in `/login`, loads `getUserDetails` in `AppComponent`, to show `Welcome` message, adds tried 
     * - (1.3) sets message in `sessionService`, in login page to show 
     * - (1.4) redirect to `/login` page 
     * 
     * @param request 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
                    catchError((error: HttpErrorResponse) => {
                        //console.info('HttpConfigInterceptor <> HttpErrorResponse <> error');
                        //console.info(error);
                        let currentURL = this.router.url;

                        if ( error.error.indexOf('SESSION_EXPIRED') >= 0 ) {    // (1)
                            this.userService.clearUserDetails();    // (1.1)

                            if ( currentURL !== '/' && currentURL !== '/login' ) {  // (1.2)
                                this.sessionService.set('errorMsgCode', 'SESSION_EXPIRED'); // (1.3)
                            }

                            this.router.navigate(["/login"]);   // (1.4)
                        }

                        return throwError(error);
                    })
                );
    };
}