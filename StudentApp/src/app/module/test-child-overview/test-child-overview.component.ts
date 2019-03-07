import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-child-overview',
  templateUrl: './test-child-overview.component.html',
  styleUrls: ['./test-child-overview.component.css']
})
export class TestChildOverviewComponent implements OnInit {

  nStrParentParamId: any;
  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute) { }
  
  /**
   * to get parent's route param 
   */
  ngOnInit() {
    //console.info('TestChildOverviewComponent <> ngOnInit() <> 111111');

    this.sub = this.route.parent.params.subscribe(params => {
      this.nStrParentParamId = +params["id"];
    });
  }


  ngOnDestroy() {
    //console.info('TestChildOverviewComponent <> ngOnDestroy() <> 222222');
    this.sub.unsubscribe();
  }
}
