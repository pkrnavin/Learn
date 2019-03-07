import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  // Note: `LoadingComponent` adds, in parent `div` class to add `class="loading"`, of background `loading` mask to show for the `div` 
  @Input('loading') bLoading: boolean;

  constructor() { }

  ngOnInit() {
  }
  
}
