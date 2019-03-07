import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../student-details/student.service';
import { UtilsService } from 'src/app/common/service/utils/utils.service';
import { MessageBoxService } from 'src/app/common/service/messageBox/message-box.service';
import { Subscription } from 'rxjs';
import { StudentFormComponent } from '../student-form/student-form.component';
import { PaginationService } from 'src/app/common/component/pagination/pagination.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalStudentHistoryDetailsComponent } from '../modal-student-history-details/modal-student-history-details.component';

/**
 * Note: grid pagination component top, bottom adds (ie. grid bottom select page to reflect in top, if top selects to reflect in bottom), 
 *   `PaginationComponent` settings values in `PaginationService`, 
 * in Component's `providers` `PaginationService` adds, single instance of `PaginationService` service creates of multiple `Pagination` component in the grid component 
 */
@Component({
  selector: 'app-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.css'],
  providers: [PaginationService]
})
export class StudentGridComponent implements OnInit {

  bLoadingGridStudentDetails = false;

  aryUserStudentDetails: any[];
  
  subscribeLoadGrid: Subscription;

  nStudentIdSelectedRow: number;

  /* in grid of selected interest codes, respective text to display, 
   *  in `student-details.component.html`, `StudentFormComponent`'s component function to call `StudentGridComponent` component template reference variable adds, 
   * angular in sibling component call function from another component, below link tried 
   * https://stackoverflow.com/questions/37587732/how-to-call-another-components-function-in-angular2
  */
  @Input('compStudentForm') compStudentForm: StudentFormComponent;
  
  public bsModalRef: BsModalRef;
  
  constructor(private studentService: StudentService, public utilsService: UtilsService, private messageBoxService: MessageBoxService, private paginationService: PaginationService, private modalService: BsModalService) { }

  /**
   * - (1) student form add, to load refresh student grid details, 
   * - (2) page refresh, to load student grid details, 
   */
  ngOnInit() {
    // (1) 
    this.subscribeLoadGrid = this.studentService.getMsgLoadStudentGridAsObservable().subscribe(msg => {
      //console.info('StudentGridComponent <> ngOnInit() <> msg: '+msg);

      this.getUserStudentsDetails();
    });

    // (2)
    this.getUserStudentsDetails();

    // (3) 
    this.paginationService.setLimit(5);
    this.paginationService.setMaxSize(5);
    //this.paginationService.setTotalResults(32);
    this.paginationService.setModelCurrentPage(1);
  }
  
  
  // TODO: pagination limit, offset to set 
  /**
   * grid user's students details 
   * - (1) response failure  
   * - (2) response success
   * - (2.1) pagination total results to sets 
   */
  getUserStudentsDetails() {
    //console.info('getUserStudentsDetails() <> 111111');
    this.showLoadingGridStudentDetails();

    //console.info('getLimit: '+this.paginationService.getLimit()+' <> getOffset: '+this.paginationService.getOffset());

    this.clearSelectedRowStudentId();
    
    this.studentService.getUserStudentsDetails(this.paginationService.getLimit(), this.paginationService.getOffset()).subscribe(joResp => {
      this.hideLoadingGridStudentDetails()

      if ( ! joResp.success  ) {  // (1)
        this.messageBoxService.showMessage(joResp.errorMessage);
      } else {  // (2)
        let joResultStudentDetails = joResp.data.message;
        
        this.aryUserStudentDetails = joResultStudentDetails.studentDetailsData;

        //console.info('getUserStudentsDetails <> totalResults: '+joResultStudentDetails.totalResults+' <> aryUserStudentDetails.length: '+this.aryUserStudentDetails.length);
        // (2.1)
        this.paginationService.setTotalResults(joResultStudentDetails.totalResults);
        this.paginationService.setPaginationResultsPerPage(this.aryUserStudentDetails.length);
      }
    });
  };

  reloadUserStudentDetails(): void {
		this.getUserStudentsDetails();
	};

  /**
   * to del row 
   * - (0.1) `setTimeout` adds grid buttton click, to highlight row 
   * - (1) cancel row del 
   * - (1.1) to highlight row (i.e. edit selected values in form, of varies row `delete` select `Cancel` from `confirm` box, to highlight edit selected row, to add to try); 
   *         Note: grid row the button clcik, after `$scope.setSelectedRowFromStudentId`, the function `edit`, `delete` to call adds tries, below working of before edit selected row to highlight,  
   * - (1.2) of edit selected row to highlight, scope value change to reflect, below adds, to try
   * 
   * @param joStudent 
   */
  deleteRow(joStudent): void {
    setTimeout(() => {  // (0.1)
      let bDeleteRow = confirm("Are you sure to delete row?");
      if ( ! bDeleteRow ) { // (1)
        let nFormStudentId = this.compStudentForm.studentForm.get('studentId').value;
        // (1.1)
        if ( ! UtilsService.isValueEmpty(nFormStudentId) ) { // (1.2)
          this.setSelectedRowFromStudentId(nFormStudentId);
        }
      } else {
        this.showLoadingGridStudentDetails();

        this.studentService.deleteRow(joStudent.studentId).subscribe(joResp => {
          this.hideLoadingGridStudentDetails();

          if ( ! joResp.success ) {
            this.messageBoxService.showMessage(joResp.errorMessage);
          } else {
            this.messageBoxService.showMessage(joResp.data.message);

            this.compStudentForm.resetForm();

            this.getUserStudentsDetails();
          }
        });
      }
    });
  };

	// to get Transport selected datum; of grid added value, respective text (i.e. displaying value) to set 
  getSelectedTransportFromCode(selectedValue): any {
		//console.info('$scope.getSelectedTransportFromCode <> 1111111');
		let joSelected;
		
		joSelected = UtilsService.getSelectedDatumFromArrayInJSON(this.studentService.getTransportModes(), 'code', selectedValue);
		
		//console.info('$scope.getSelectedTransportFromCode <> joSelected: '+JSON.stringify(joSelected));
		
		return joSelected;
	};

	// to get selected Nationality from value; of grid to show 
	getSelectedNationalityFromCode(selectedValue): any {
		//console.info('getSelectedNationalityFromCode <> 222222');
		let joSelected;
		
		joSelected = UtilsService.getSelectedDatumFromArrayInJSON(this.studentService.getNationalities(), 'code', selectedValue);
		
		//console.info('getSelectedNationalityFromCode <> joSelected: '+JSON.stringify(joSelected));
		
		return joSelected;
  };
  
  // grid edit click, to set value in student form 
  sendMsgLoadStudentFormDetails(joStudent): any {
    this.studentService.sendLoadStudentForm(joStudent);
  };

  /**
   * grid selected row studentId 
   */
  setSelectedRowFromStudentId(nStudentId): any {
		this.nStudentIdSelectedRow = nStudentId;
  };

  clearSelectedRowStudentId() {
    //console.info('clearSelectedRowStudentId() <> 3333333 <> studentId: '+this.compStudentForm.studentForm.get('studentId').value);
		/* of edit selected row values in form, not to clear, to tries; 
		 *  (i.e. to clear, grid row selected, of grid select, edit row not selected)
		 */
		if ( UtilsService.isValueEmpty(this.compStudentForm.studentForm.get('studentId').value) ) {
			//console.info('clearSelectedRowStudentId() <> 44444');
			this.nStudentIdSelectedRow = undefined;
		}
  };
  
  /**
   * to open studnet history details, modal 
   * - (1) modal window to pass data, variable `initialState` adds working, other name not working, from this way able to gets value in `component` 
   *     grid data respective displaying value to show the function adds, 
   * - (1.1) to pass data, modal window options 
   * - (2) `bsModalRef.content` data directly gets in template 
   * 
   * @param joStudent 
   */
  openModalStudentHistoryDetails(joStudent): any {
    //console.info('openModalStudentHistoryDetails <> 11111 <> joStudent: '+JSON.stringify(joStudent));
    // (1)
    const initialState = {
      studentId: joStudent.studentId,
      //class: 'modal-lg',
      title: 'Student Record History Details',
      getSelectedNationalityFromCode: this.getSelectedNationalityFromCode,
      getSelectedTransportFromCode: this.getSelectedTransportFromCode,
      getSelectedInterestDetails: this.compStudentForm.getSelectedInterestDetails
    };

    this.clearEditFormValuesGridVariesRowSelect();

    this.bsModalRef = this.modalService.show(ModalStudentHistoryDetailsComponent, { initialState, class: 'luModalXl' }); // (1.1)
    //this.bsModalRef.content.studentId = joStudent.studentId;
    this.bsModalRef.content.titleModalRef = 'Title BsModalRef 123'; // (2)
  };
  
	// of edit selected row, varies row select, to clear form values, below adds 
	clearEditFormValuesGridVariesRowSelect(): void {
    let nFormStudentId = this.compStudentForm.studentForm.get('studentId').value;
    console.info('clearEditFormValuesGridVariesRowSelect <> nFormStudentId: '+nFormStudentId+' <> this.nStudentIdSelectedRow: '+this.nStudentIdSelectedRow);

		if ( ! UtilsService.isValueEmpty(nFormStudentId) && nFormStudentId !== this.nStudentIdSelectedRow) {
			this.compStudentForm.resetForm();
		}
	};
  
	showLoadingGridStudentDetails() { this.bLoadingGridStudentDetails = true; };
  hideLoadingGridStudentDetails() { this.bLoadingGridStudentDetails = false; };

  ngOnDestroy() {
    this.subscribeLoadGrid.unsubscribe();
  };
}
