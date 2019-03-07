import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaginationService } from './pagination.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  //paginationService: PaginationService;
  //nModelCurrentPage: number;

  @Output() loadGridData = new EventEmitter();

  constructor(public paginationService: PaginationService) { }

  ngOnInit() {
    //this.paginationService = this.pService;
  }
  
  /**
   * - (1) `setTimeout` adds to call single time, as 2 time calls, tried 
   * 
   * @param event 
   */
  pageChanged(event): void {
    //console.info('pageChanged <> event: '+JSON.stringify(event));

    // (1)
    //setTimeout(() => {
    this.loadGridData.emit();
    //}, 100);
  };
}
