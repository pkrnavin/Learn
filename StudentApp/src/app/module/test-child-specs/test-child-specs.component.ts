import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-child-specs',
  templateUrl: './test-child-specs.component.html',
  styleUrls: ['./test-child-specs.component.css']
})
export class TestChildSpecsComponent implements OnInit {

  nStrParentParamId: any;
  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * to get parent's route param 
   */
  ngOnInit() {
    //console.info('TestChildSpecsComponent <> ngOnInit() <> 111111');
    
    this.sub = this.route.parent.params.subscribe(params => {
      this.nStrParentParamId = +params["id"];
    });
  }
  
  
  ngOnDestroy() {
    //console.info('TestChildSpecsComponent <> ngOnDestroy() <> 222222');
    this.sub.unsubscribe();
  }
}
