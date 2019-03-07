import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/service/userService/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/common/service/session/session.service';
import { MessageBoxService } from 'src/app/common/service/messageBox/message-box.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  joLoginUserDetails: any;

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private userService: UserService, private messageBoxService: MessageBoxService) { }

  ngOnInit() {
    this.setUserDetails();
  }

  /**
   * to set user details 
   */
  setUserDetails(): void {
    //console.info('HeaderComponent <> setUserDetails() <> 1111111');

    this.userService.getUserDetailsAsSubjObservable().subscribe(joLoginUserDetails => {
      //console.info('HeaderComponent <> setUserDetails() <> 22222 <> joLoginUserDetails: '+JSON.stringify(joLoginUserDetails));
      this.joLoginUserDetails = joLoginUserDetails;
    });
  };

  loadLoginUserDetails(): void {
    this.userService.getLoginUserDetails();
  };

  /**
   * logout user 
   * - (1) logout success, 
   *     response message sets in login page to show adds, 
   *     userDetails value resets, as redirect to `/login`, `RouteGuard` checks activates route 
   * - (2) logout failure, error message to show 
   */
  logout(): void {
    this.userService.logout().subscribe(joResp => {
      //console.info('logout() <> joResp: '+JSON.stringify(joResp));

      if ( joResp.success ) { // (1)
        let successMsgCode = joResp.data.message;
        this.sessionService.set("successMsgCode", successMsgCode);

        this.userService.clearUserDetails();

        this.router.navigate(["login"]);
      } else {  // (2)
        let errMsgCode = joResp.errorMessage;

        this.messageBoxService.showErrorMessageFromCode(errMsgCode);
      }
    });
  };
}
