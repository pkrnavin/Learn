import { Component } from '@angular/core';
import { UserService } from './common/service/userService/user.service';
import { AppConfigService } from './common/service/appconfig/app-config.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StudentApp';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private userService: UserService) {}

  /**
   * loginUserDetails loads page refresh, to calls, to adds 
   * - (1) to loads login UserDetails page refresh  
   */
  ngOnInit() {
    //console.info('AppComponent <> 11111111');
    //console.info('AppComponent <> AppConfigService.UI_SERVICE_URL: '+AppConfigService.UI_SERVICE_URL);
    
    this.userService.getLoginUserDetails(); // (1)
    
    let titleRoot = this.titleService.getTitle() + ' :: ';
    //console.info('this.titleService.getTitle(): '+this.titleService.getTitle());
    
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        //console.log('AppComponent <> title: '+title);
        this.titleService.setTitle(titleRoot + title);
      }
    });
  };

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }
    
    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  };
}