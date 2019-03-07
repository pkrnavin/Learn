import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConfigService } from 'src/app/common/service/appconfig/app-config.service';
import { UserService } from 'src/app/common/service/userService/user.service';
import { MessageBoxService } from 'src/app/common/service/messageBox/message-box.service';
import { SessionService } from 'src/app/common/service/session/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bLoadingLogin: boolean = false;
  bLoginFormSubmitted: boolean = false;

  public loginForm: FormGroup;


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private formBuilder: FormBuilder, private messageBoxService: MessageBoxService, private sessionService: SessionService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * TODO: message to show success, err, `Welcome` in `AngularJS` `LearnUI`  
   * - (1) to show message in login page loads 
   */
  ngOnInit() {
    this.showMessageInLoginPageOnLoads(); // (1)
  }
  
  /**
   * to route from component; 
   * Note: below parameter value in `pathParam` not configures, in URL as `http://localhost:4200/test;id=123` 
   */
  routeFromComponent(): void {
    //console.info('routeFromComponent() <> 111111');
    this.router.navigate(["test", { id: 123 }]);
  };
  
  /**
   * to login user 
   * - (1.0) to set loginForm submitted state
   * - (1.1) Login form to show loading 
   * - (2) Login success, to `getUserDetails`, redirect to home 
   * - (2.1) commented `getLoginUserDetails`, in `HomeComponent` `ngOnint` adds 
   * - (3) Login failure, to in same page, message to show to add 
   * - (3.1) Login failure, to clear form field password default, of other than `PASSWORD_NOT_MATCHES` to clear `Username` field 
   * - (0.1) subscribe `next` value comes, to handles, 
   * - (0.2) subscribe `err` to handles,
   * - (0.3) subscribe `complete` to handles,
   * - (4) form reset submitted, adds in subscribe complete, as would calls `next` 
   */
  login(): void {
    this.setLoginFormSubmitted(); // (1.0)

    if ( this.loginForm.invalid ) return;

    this.showLoadingLoginForm(); // (1.1)

    this.userService.login(this.loginForm.get('userName').value, this.loginForm.get('password').value).subscribe(
      joResp => { // (0.1)
        this.hideLoadingLoginForm();
        this.loginForm.markAsPristine();
        
        if ( joResp.success ) { // (2) 
          this.userService.getLoginUserDetails(); // (2.1)

          this.router.navigate(["user", "home"]);
        } else {  // (3)
          let errMsgCode = joResp.errorMessage;
          
          // (3.1)
          this.loginForm.get('password').setValue('');
          if ( errMsgCode !== 'PASSWORD_NOT_MATCHES' ) {
            this.loginForm.get('userName').setValue('');
          }

          this.messageBoxService.showErrorMessageFromCode(errMsgCode);
        }
      }, err => { // (0.2)
        this.hideLoadingLoginForm();

        this.messageBoxService.showMessage('Problem with services.');
      }, () => {  // (0.3)
        this.resetLoginFormSubmitted(); // (4)

        //console.info('Observer login complete');
      }
    );
  };

  /**
   * to reset loginForm field values, form setPristine, reset form submitted state 
   */
  resetLoginForm(): void {
    this.loginForm.reset();
    this.loginForm.markAsPristine();
    this.resetLoginFormSubmitted();
  };
  
  /**
   * to show message in login page loads, of in `sessionStorage` sets, 
   *   message to show from code, after shows destory in `sessionStorage` 
   * - (1) error message 
   * - (2) success message 
   * - (3) `Welcome`
   */
  showMessageInLoginPageOnLoads(): void {
    let errorMsgCode = this.sessionService.get('errorMsgCode'), 
        successMsgCode = this.sessionService.get('successMsgCode');
    
    if ( errorMsgCode !== null && errorMsgCode.length > 0 ) { // (1)
      this.messageBoxService.showErrorMessageFromCode(errorMsgCode);

      this.sessionService.destroy("errorMsgCode");
    } else if ( successMsgCode !== null && successMsgCode.length > 0 ) {  // (2)
      this.messageBoxService.showSuccessMessageFromCode(successMsgCode);

      this.sessionService.destroy("successMsgCode");
    } else {  // (3)
      this.messageBoxService.showMessage('Welcome');
    }
  };

  setLoginFormSubmitted() { this.bLoginFormSubmitted = true; };
  resetLoginFormSubmitted() { this.bLoginFormSubmitted = false; };

  showLoadingLoginForm() { this.bLoadingLogin = true; };
  hideLoadingLoginForm() { this.bLoadingLogin = false; };
}