import { Injectable } from '@angular/core';

/* commented, grid to add 
@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class PaginationService {

  nTotalResults: number;
  nNumberOfPages: number;
  // default sets 
  nModelCurrentPage: number = 1;
  nLimit: number = 5;
  nMaxSize: number = 5;

  pageFromRowCount: number;
  pageToRowCount: number;

  constructor() { }

  setLimit(nLimit: number): void {
    this.nLimit = nLimit;
  };
  getLimit(): number {
    return this.nLimit;
  };

  setMaxSize(nMaxSize: number): void {
    this.nMaxSize = nMaxSize;
  };
  getMaxSize(): number {
    return this.nMaxSize;
  };

  setTotalResults(nTotalResults: number): void {
    this.nTotalResults = nTotalResults;
    this.nNumberOfPages = this.getNumberOfPages();
  };
  getTotalResults(): number {
    return this.nTotalResults;
  };

  setModelCurrentPage(nModelCurrentPage: number): void {
    this.nModelCurrentPage = nModelCurrentPage;
  };
  getModelCurrentPage(): number {
    return this.nModelCurrentPage;
  };

  getNumberOfPages(): number {  // to get number of pages 
    let nNumberOfPages;
    
    // calculate total pages; `Math.ceil(2.3)` to return `3` (i.e. to round upwards to the nearest integer)
    nNumberOfPages = Math.ceil(this.nTotalResults / this.nLimit);
    
    //console.info('3333 <> getNumberOfPages <> nNumberOfPages: '+nNumberOfPages);
    
    return nNumberOfPages;	// commented, below checking to try 
    //return 10;	// Note: of value returns, library sets respective, thinks 
  };

  getOffset(): number {	// from start index, grid rows to get of given limit count, 
    let nOffset = (this.nModelCurrentPage - 1) * this.nLimit;
    //console.info('22222 <> getOffset <> this.currentPage: '+this.currentPage+' <> this.limit: '+this.limit+' <> nOffset: '+nOffset);
    
    // page number, starts with `1`, so below respective to adds, to set in SELECT query, tries 
    return nOffset;
  };

  setPaginationResultsPerPage(nNoOfResultsInPage): void {
    /* to set pagination results, of page's displaying rows count of first, last in the page; 
     *  to call in grid ajax call response, of total results to set, number of results returns for the page, to pass, to set the page's row count details 
     */
    //console.info('555555 <> setPaginationResultsPerPage');
    let nOffset = this.getOffset();
    
    // `Openmentor` job search adds, page's rows count of `from`, `to` adds, 
    
    // page's first from row count 
    this.pageFromRowCount = nOffset + 1;
    // page's last to row count 
    this.pageToRowCount = (nNoOfResultsInPage + nOffset) || '';
    //console.info('setPaginationResultsPerPage <> this.pageFromRowCount: '+this.pageFromRowCount+' <> this.pageToRowCount: '+this.pageToRowCount);
  }
}
