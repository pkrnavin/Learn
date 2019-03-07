import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StudentService } from '../student-details/student.service';
import { PaginationService } from 'src/app/common/component/pagination/pagination.service';
import { MessageBoxService } from 'src/app/common/service/messageBox/message-box.service';

@Component({
  selector: 'app-modal-student-history-details',
  templateUrl: './modal-student-history-details.component.html',
  styleUrls: ['./modal-student-history-details.component.css'],
  providers: [PaginationService]
})
export class ModalStudentHistoryDetailsComponent implements OnInit {

  public studentId: number;
  public class: string;
  public title: string;
  public titleModalRef: string;

  bLoadingGridStudentDetails: boolean = false;

  aryUserStudentDetails: any[];


  //constructor() { }
  constructor(public bsModalRef: BsModalRef, private messageBoxService: MessageBoxService, private paginationService: PaginationService, public studentService: StudentService) { }

  /**
   * - (1) pagination settings to sets 
   * - (2) tried, setClass not working 
   * - (3) loads student history grid details 
   */
  ngOnInit() {
    //console.info('ModalStudentHistoryDetailsComponent <> 1111111');
    ////console.info('studentId: '+this.bsModalRef.content.studentId);
    //console.info('studentId: '+this.studentId);
    //console.info('class: '+this.class);
    //console.info('title: '+this.title);
    //console.info('titleModalRef: '+this.titleModalRef);
    //console.info('titleModalRef: '+this.bsModalRef.content.titleModalRef);
  
    // (1) 
    this.paginationService.setLimit(5);
    this.paginationService.setMaxSize(5);
    this.paginationService.setModelCurrentPage(1);

    //this.bsModalRef.setClass(this.class); // (2)

    this.getStudentRecordHistoryDetails();  // (3)
  }

  
  // to get student history details 
  getStudentRecordHistoryDetails() {
    this.showLoadingGridStudentDetails();

    this.studentService.getStudentRecordHistoryDetails(this.studentId, this.paginationService.getLimit(), this.paginationService.getOffset()).subscribe(joResp => {
      this.hideLoadingGridStudentDetails();

      if ( ! joResp.success ) {
        this.messageBoxService.showMessage(joResp.errorMessage);
      } else {
        let joResultStudentDetails = joResp.data.message;

        this.aryUserStudentDetails = joResultStudentDetails.studentDetailsData;

        this.paginationService.setTotalResults(joResultStudentDetails.totalResults);
        this.paginationService.setPaginationResultsPerPage(this.aryUserStudentDetails.length);
      }
    });
  };

  reloadStudentRecordHistoryDetails(): void {
		this.getStudentRecordHistoryDetails();
	};
  
  showLoadingGridStudentDetails() { this.bLoadingGridStudentDetails = true; };
	hideLoadingGridStudentDetails() { this.bLoadingGridStudentDetails = false; };
}
