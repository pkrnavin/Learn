import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { StudentService } from '../student-details/student.service';
import { UtilsService } from 'src/app/common/service/utils/utils.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { MessageBoxService } from 'src/app/common/service/messageBox/message-box.service';
import { PaginationService } from 'src/app/common/component/pagination/pagination.service';
import { Subscription } from 'rxjs';
import { StudentGridComponent } from '../student-grid/student-grid.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  providers: [PaginationService]
})
export class StudentFormComponent implements OnInit {
  
  public studentForm: FormGroup;

  private bStudentFormSubmitted: boolean;

  aryNationalities: any[];
  aryTransportModes: any[];
  aryInterestedIns: any[];
  aryEmailFieldErrorMessages: any[];
  
  //datepickerFieldDefaultOptions: any;
  datepickerDOBFieldOptions: Partial<BsDatepickerConfig> = { maxDate: new Date() };
  dobInitValue: Date = new Date(1991, 0, 1);

  bLoadingGridStudentDetails = false;
  bLoadingFormStudentDetails = false;

  aryUserStudentDetails: any[];

  subscribeLoadStudentFormValues: Subscription;

  /**
   * to call `StudentGrid` function 
   */
  @Input('compStudentGrid') compStudentGrid: StudentGridComponent;



  // `public` adds in  `utilsService`, in template to use, to add 
  constructor(private formBuilder: FormBuilder, private studentService: StudentService, public utilsService: UtilsService, private messageBoxService: MessageBoxService, private paginationService: PaginationService) {
    this.studentForm = this.formBuilder.group({
      studentId: null,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      nationality: [null, [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      transport: ['', [Validators.required]],
      //interests: ['', [Validators.required]]
      interests: new FormArray([])
    });
  }

  /**
   * value sets form field
   * - (1) select field's data to set, to add 
   * - (2) radio button field's data to set, to add 
   * - (3) checkbox field's data to set, to add 
   * - (4) email field error messages, of custom message of field to pass, to add 
   * - (5) datepicker field default options to sets 
   * - (6) to set default values in form 
   * - (7) pagination to checking adds, grid pagination select, reflects in form pagination component to checking to try 
   */
  ngOnInit() {
    this.aryNationalities = this.studentService.getNationalities(); // (1)

    this.aryTransportModes = this.studentService.getTransportModes(); // (2)

    this.aryInterestedIns = this.studentService.getInterestedIns(); // (3)
    
    this.aryEmailFieldErrorMessages = this.studentService.getEmailFieldErrorMessages(); // (4)

    //this.datepickerFieldDefaultOptions = UtilsService.getDatepickerDefaultConfig(); // (5)

    //this.studentForm.get('dateOfBirth').setValue(this.dobInitValue);

    this.setInterestsCheckboxesControls();

    this.setFormDefaultValues() // (6)

    //console.info('this.studentForm');
    //console.info(this.studentForm);
    
    /*// (7) 
    this.paginationService.setLimit(10);
    this.paginationService.setMaxSize(5);
    this.paginationService.setTotalResults(32);
    this.paginationService.setModelCurrentPage(1);*/

    this.listenLoadAndSetValuesInStudentForm(); // (8)
  }

  /**
   * One Form Group for one interest 
   * `aryInterestedIns = [{...}, {...}, ...]` json value `text`, `selected`, in checkbox formGroup added as `{<text>: <selected>}` 
   * below as 
   * `formGroupInterests = [
   *  this.formBuilder.group( {<text>: <selected>} ) /* FormControl, intrest's array's JSON `text`, `selected` added * /
   *  this.formBuilder.group( {'Books': true} ), ...
   * ]`
   * builds as `FormArray`, `formGroupInterests` 
   * in `studentForm` `interests` sets `FormArray` of `formGroupInterests` sets 
   * formGroup: `{"Books": true (OR) false}` 
   */
  private setInterestsCheckboxesControls() {
    /* 
    this.aryInterestedIns.map((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.studentForm.get('interests') as FormArray).push(control);
    });*/
    
    // 
    const formGroupInterests = this.aryInterestedIns.map(joInterest =>{
      let joField = {};
      joField[joInterest.text] = joInterest.selected;
      return this.formBuilder.group(joField);
    });
    //console.info('setInterestsCheckboxesControls() <> 1111111');
    //console.info('formGroupInterests');
    //console.info(formGroupInterests);

    const formArrayInterests = this.formBuilder.array(formGroupInterests);
    //console.info('formArrayInterests');
    //console.info(formArrayInterests);

    this.studentForm.setControl('interests', formArrayInterests);
  };

  get interests(): FormArray {
    return this.studentForm.get('interests') as FormArray;
  };

  /**
   * to get selected `interests` from `FormArray`, 
   * from formselect selected interests `text` value gets 
   * - (1) iterate `FormArray`, has formGroup of joInterset items 
   * - (2) instance `FormGroup` to adds, inside `if` `formGroupInterest.controls` working 
   * - (3) `FormGroup` has joInterset's `text` as key formControl name, `selected` value 
   * 
   * checkbox tried, below link with `6` likes example 
   * https://stackoverflow.com/questions/40927167/angular-reactiveforms-producing-an-array-of-checkbox-values
   */
  public getSelectedInterestsFromFormArray(): any {
    let formArrayInterests = this.interests, 
        bSelectedInterest = false, 
        arySelectedInterestTexts = [];

    for (let formGroupInterest of formArrayInterests.controls) {  // (1)
      //console.info(' '+Object.keys(formGroupInterest.controls));
      //formGroupInterest = formGroupInterest as FormGroup;
      //formGroupInterest = <FormGroup>formGroupInterest;
      //console.info('Object.keys <> formGroupInterest: '+Object.keys(formGroupInterest));

      if (formGroupInterest instanceof FormGroup) { // (2)
        for (var keyInterestText in formGroupInterest.controls) { // (3)
          bSelectedInterest = formGroupInterest.get(keyInterestText).value;
          //console.info('keyInterestText: '+keyInterestText+' <> bSelectedInterest: '+bSelectedInterest);

          if ( bSelectedInterest ) {
            arySelectedInterestTexts.push(keyInterestText);
          }
        }
      }

      //formGroupInterest
      //formGroupInterest.con
    };
    //console.info('arySelectedInterestTexts: '+arySelectedInterestTexts);

    return arySelectedInterestTexts;
  };

  /**
   * to gets selected interests details, 
   *   from selectionCodes (ie. in grid to display), form FormArray selection, 
   * - (0.1) from grid student history modal window, the function calls fr grid data to display, `this.aryInterestedIns` returns undefined, respective adds tried working 
   * - (1) from selectionCodes (ie. database added values), to get 
   * - (2) from `FormArray`, selected values of json's `text` key's values, to get 
   * - (3) forLoop get data 
   * 
   * @param selectionCodes
   */
  public getSelectedInterestDetails(selectionCodes ?:string): any {
    let arySelectionCodes = [], arySelectionTexts = [], joInterest, 
        arySelectedInterests = [], arySelectedInterestCodes = [];

    let aryInterestedIns = (this.aryInterestedIns || this.studentService.getInterestedIns()); // (0.1)

    if ( ! UtilsService.isValueEmpty(selectionCodes) ) {  // (1)
      arySelectionCodes = selectionCodes.split(',');
    } else {  // (2)
      arySelectionTexts = this.getSelectedInterestsFromFormArray();
    }
    //console.info('getSelectedInterestDetails <> arySelectionTexts: '+arySelectionTexts);
    //console.info('this.aryInterestedIns: '+JSON.stringify(this.aryInterestedIns)+' <> getInterestedIns(): '+this.studentService.getInterestedIns());

    for (var i = 0; i < aryInterestedIns.length; i = i + 1) {  // (3)
      joInterest = aryInterestedIns[i];

      if ( arySelectionCodes.indexOf(joInterest.code) > -1 || arySelectionTexts.indexOf(joInterest.text) > -1 ) {
				arySelectedInterests.push(joInterest);
				arySelectedInterestCodes.push(joInterest.code);
      }
    }
    //console.info('arySelectedInterests: '+JSON.stringify(arySelectedInterests));
    //console.info('arySelectedInterestCodes: '+JSON.stringify(arySelectedInterestCodes));

    return [arySelectedInterests, arySelectedInterestCodes];
  };

  /**
   * from grid edit select, to set values in form 
   * 
   * @param selectionCodes 
   */
  public setSelectedInterests(selectionCodes): any {
    let arySelectionCodes = [], joInterest;
    arySelectionCodes = selectionCodes.split(',');

    for (var i = 0; i < this.aryInterestedIns.length; i = i + 1) {
      joInterest = this.aryInterestedIns[i];
      joInterest.selected = (arySelectionCodes.indexOf(joInterest.code) > -1);
    };
    //console.info('this.aryInterestedIns: '+JSON.stringify(this.aryInterestedIns));

    this.setInterestsCheckboxesControls();
  };

  /**
   * to clear checkbox selected interests 
   */
  clearSelectedInterests() {
    this.setSelectedInterests('');
  };

  /**
   * to set default values in form 
   */
  setFormDefaultValues(): void {
    this.studentForm.get('nationality').setValue(this.aryNationalities[0]);

    this.studentForm.get('transport').setValue('INSTITUTE_VEHICLE');
    
    this.setSelectedInterests('BOOKS,MARTIAL_ARTS');
  };
  
  /**
   * to clear form values 
   */
  clearForm(): void {
    this.clearSelectedInterests();

    this.studentForm.reset();

    this.studentForm.markAsPristine();
  };
  
  /**
   * to reset form clear, set default values in form 
   */
  resetForm(): void {
    this.clearForm();

    this.setFormDefaultValues();
  };
  
  /**
   * to get, selected interests of checkbox field 
   */
  saveStudentDetails(): void {
    let arySelectedInterestsDetails = this.getSelectedInterestDetails(),  // (1)
      arySelectedInterestsCodes = arySelectedInterestsDetails[1];
    
    if ( this.studentForm.invalid || arySelectedInterestsCodes.length === 0 ) {
      this.messageBoxService.showErrorMessageFromCode('MUST_VALID_FORM');
      return;
    }

    this.showLoadingFormStudentDetails();
    
    this.studentService.saveStudentDetails(this.studentForm.value, arySelectedInterestsCodes).subscribe(joResp => {
      //console.info('this.studentService.saveStudentDetails <> joResp: '+JSON.stringify(joResp));

      this.compStudentGrid.clearSelectedRowStudentId();

      this.hideLoadingFormStudentDetails();

      if ( ! joResp.success  ) {
        this.messageBoxService.showMessage(joResp.errorMessage);
      } else {
        this.messageBoxService.showMessage(joResp.data.message);

        this.resetForm();

        this.studentService.sendMsgLoadStudentGrid('LOAD_STUDENT_GRID');
      }
    });
  };

  /**
   * listen to load and set values in student form 
   * - (1) from grid edit click in `GridComponent`, in form component send message, to load set values in form 
   * - (2) to load and set values in StudentForm 
   * - (2.1) to set values in `StudentForm` 
   */
  listenLoadAndSetValuesInStudentForm(): any {
    this.subscribeLoadStudentFormValues = this.studentService.getLoadStudentFormAsObservable().subscribe(joStudent => { // (1)
      //console.info('listenLoadAndSetValuesInStudentForm() <> joStudent: '+JSON.stringify(joStudent));
      
      this.showLoadingFormStudentDetails();

      this.studentService.getUserStudentDetails(joStudent.studentId).subscribe(joResp => {  // (2)
        this.hideLoadingFormStudentDetails();
        //console.info('listenLoadAndSetValuesInStudentForm() <> getUserStudentDetails <> joResp: '+JSON.stringify(joResp));

        if ( ! joResp.success ) {
          this.messageBoxService.showMessage(joResp.errorMessage);
        } else {
          let joStudentDetails = joResp.data.message;

          this.setValuesInStudentForm(joStudentDetails);  // (2.1)
        }
      });
    });
  };

  /**
   * to set values in student form, 
   * 
   * @param joStudentDetails 
   */
  setValuesInStudentForm(joStudentDetails): void {
    this.studentForm.get('studentId').setValue(joStudentDetails.studentId);
    this.studentForm.get('firstName').setValue(joStudentDetails.firstName);
    this.studentForm.get('lastName').setValue(joStudentDetails.lastName);
    this.studentForm.get('fatherName').setValue(joStudentDetails.fatherName);
    this.studentForm.get('motherName').setValue(joStudentDetails.motherName);
    this.studentForm.get('address').setValue(joStudentDetails.address);
    this.studentForm.get('email').setValue(joStudentDetails.emailId);
    this.studentForm.get('phoneNumber').setValue(joStudentDetails.phoneNumber);

    let joNationality = this.compStudentGrid.getSelectedNationalityFromCode(joStudentDetails.nationality);
    this.studentForm.get('nationality').setValue(joNationality);

    this.studentForm.get('dateOfBirth').setValue(new Date(joStudentDetails.dateOfBirthMillis));
    this.studentForm.get('transport').setValue(joStudentDetails.transport);
    
    this.setSelectedInterests(joStudentDetails.interests);
  };
  
	showLoadingFormStudentDetails() { this.bLoadingFormStudentDetails = true; };
  hideLoadingFormStudentDetails() { this.bLoadingFormStudentDetails = false; };
  
  ngOnDestroy() {
    this.subscribeLoadStudentFormValues.unsubscribe();
  };
}