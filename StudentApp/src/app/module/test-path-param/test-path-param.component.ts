import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Note: interfaces of Component LifeCycle hooks are optional 
 */
@Component({
  selector: 'app-test-path-param',
  templateUrl: './test-path-param.component.html',
  styleUrls: ['./test-path-param.component.css']
})
export class TestPathParamComponent { // implements OnInit, OnChanges 

  nStrParamId: any;
  private sub: any;


  /**
   * below gets value from route 
   * 
   * @param route 
   * @param router 
   */
  constructor(private route: ActivatedRoute, private router: Router) {
    console.info('TestPathParamComponent <> constructor <> 111111');

    this.sub = this.route.params.subscribe(params => {
      console.log('params: '+JSON.stringify(params));

      this.nStrParamId = params.id;
    });
  }


  ngOnInit() {
    console.info('TestPathParamComponent <> ngOnInit() <> 33333');
  }


  ngOnChanges(changes: SimpleChanges) {
    console.info('TestPathParamComponent <> ngOnChanges() <> 222222');
  }

  /**
   * - route from component, to checking of same URL route in page, pathParam value changes `ngOnInit` to cheking 
   *     Note: URL route in same page, pathParam value changes `ngOnInit` NOT CALLS of pathParam value changes 
   * - URL route has `testPathParam/:id` (ie. has `/` in route), in `router.navigate` of pathParms to route `/` split of values to add 
   * 
   * `//this.router.navigate(["testPathParam", { id: nStrId }]);` not working, queryParams thinks 
   * @param nStrId 
   */
  routeFromComponent(nStrId: string): void {
    this.router.navigate(["testPathParam", nStrId]);
  };

  
  ngOnDestroy() {
    console.info('TestPathParamComponent <> ngOnDestroy() <> 44444');
    this.sub.unsubscribe();
  }
}
