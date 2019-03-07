import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-route-child',
  templateUrl: './test-route-child.component.html',
  styleUrls: ['./test-route-child.component.css']
})
export class TestRouteChildComponent implements OnInit {

  nStrParamId: any;
  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    console.info('TestRouteChildComponent <> ngOnInit() <> 111111');

    this.sub = this.route.params.subscribe(params => {
      console.log('TestRouteChildComponent <> params: '+JSON.stringify(params));
      this.nStrParamId = params.id;
    });
  }


  ngOnDestroy() {
    console.info('TestRouteChildComponent <> ngOnDestroy() <> 22222');
    this.sub.unsubscribe();
  }
}
