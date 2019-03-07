import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UtilsService } from 'src/app/common/service/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
	
  private subjLoadStudentGrid = new Subject<any>();
  private subjLoadStudentForm = new Subject<any>();


  constructor(private http: HttpClient) { }
  
	// to add in select field 
	aryNationalities:any[] = [
		{ id: 1, code: 'INDIAN', text: 'INDIAN' },
		{ id: 2, code: 'CHINESE', text: 'Chinese' },
		{ id: 3, code: 'RUSSIAN', text: 'Russian' },
		{ id: 4, code: 'MALAYSIAN', text: 'Malaysian' },
		{ id: 5, code: 'INDONESIAN', text: 'Indonesian' },
		{ id: 6, code: 'AMERICAN', text: 'American' }
	];
	
	// to add in radio button, field 
  aryTransportModes:any[] = [
		{ id: 1, code: 'INSTITUTE_VEHICLE', text: 'Institute Vehicle' },
		{ id: 2, code: 'SELF', text: 'Self' }
	];
	
	// to add in checkbox, field 
  aryInterestedIns:any[] = [
		{ id: 1, code: 'BOOKS', text: 'Books', selected: false }, 
		{ id: 2, code: 'SPORTS', text: 'Sports', selected: false }, 
		{ id: 3, code: 'MUSIC', text: 'Music', selected: false }, 
		{ id: 4, code: 'DANCE', text: 'Dance', selected: false }, 
		{ id: 5, code: 'MARTIAL_ARTS', text: 'Martial Arts, Karate, KungFu', selected: false }, 
	];
	
	// custom messages, of field to pass, below adds, tries 
  aryEmailFieldErrorMessages:any[] = [{code: 'email', message: 'Must be in valid email format. '}];
	
	/**
	 * send message to load student form details 
	 * 
	 * @param joStudent 
	 */
	sendLoadStudentForm(joStudent: any): void {
		this.subjLoadStudentForm.next(joStudent);
	};

	/**
	 * to get as observable 
	 */
	getLoadStudentFormAsObservable(): Observable<any> {
		return this.subjLoadStudentForm.asObservable();
	};

	/**
	 * send message to load student grid details 
	 * 
	 * @param bUserLoggedIn 
	 */
	sendMsgLoadStudentGrid(msg: string): void {
    this.subjLoadStudentGrid.next(msg);
  };

  /**
   * to get subj As Observable 
   */
  getMsgLoadStudentGridAsObservable(): any {
    return this.subjLoadStudentGrid.asObservable();
  };

	// to get data, for select field 
	getNationalities():any {
		return this.aryNationalities;
	};
	
	// to get data, for radio button field 
	getTransportModes():any {
		return this.aryTransportModes;
	};
	
	// to get data, for checkbox, field 
	getInterestedIns():any {
		return this.aryInterestedIns;
	};
	
	// to get email field error messages; of custom message of field to pass 
	getEmailFieldErrorMessages():any {
		return this.aryEmailFieldErrorMessages;
  };
  
  /**
   * get user student details 
   * 
   * @param nStudentId 
   */
  getUserStudentDetails(nStudentId: number): Observable<any> {
    const httpParams = UtilsService.getAsHttpParams({'studentId': nStudentId});

    return this.http.post<any>('/LearnUI/getUserStudentDetails', httpParams);
	};
	
	// to add OR update student details 
	saveStudentDetails(joFormStudentDetails, arySelectedInterestsCodes): Observable<any> {
		let url, joParams;
		
		// parameters adds 
		joParams = {
			firstName: joFormStudentDetails.firstName, 
			lastName: joFormStudentDetails.lastName, 
			fatherName: joFormStudentDetails.fatherName, 
			motherName: joFormStudentDetails.motherName, 
			address: joFormStudentDetails.address, 
			email: joFormStudentDetails.email, 
			phoneNumber: joFormStudentDetails.phoneNumber, 
			nationality: joFormStudentDetails.nationality.code, 
			dateOfBirth: joFormStudentDetails.dateOfBirth.getTime(),  
			transportMode: joFormStudentDetails.transport,  
			interests: arySelectedInterestsCodes.join()
		};
		
		if ( UtilsService.isValueEmpty(joFormStudentDetails.studentId) ) {	// add 
			url = '/addStudentDetails';
		} else {	// edit 
			url = '/updateStudentDetails';
			joParams.studentId = joFormStudentDetails.studentId;
		}
		const httpParams = UtilsService.getAsHttpParams(joParams);

		return this.http.post<any>('/LearnUI'+url, httpParams);
	};
	
	// to get user students details 
  getUserStudentsDetails(nLimit, nOffset): Observable<any> {
		const httpParams = UtilsService.getAsHttpParams({limit: nLimit, offset: nOffset});

		return this.http.post<any>('/LearnUI/getUserStudentsDetails', httpParams);
	};
	
	// to delete row 
	deleteRow(nStudentId): any {
		const httpParams = UtilsService.getAsHttpParams({studentId: nStudentId});

		return this.http.post<any>('/LearnUI/deleteRow', httpParams);
	};

	/* commented, already exists 
	// to get particular student details, to set values in form fields of edit selected 
	getUserStudentDetails(nStudentId): Observable<any> {
		const httpParams = UtilsService.getAsHttpParams({studentId: nStudentId});
		
		return this.http.post<any>('/LearnUI/getUserStudentDetails', httpParams);
	};*/

	/**
	 * to get student record history details 
	 * 
	 * @param nStudentId 
	 * @param nLimit 
	 * @param nOffset 
	 */
	getStudentRecordHistoryDetails(nStudentId, nLimit, nOffset): Observable<any> {
		const httpParams = UtilsService.getAsHttpParams({studentId: nStudentId, limit: nLimit, offset: nOffset});
		
		return this.http.post<any>('/LearnUI/getStudentRecordHistoryDetails', httpParams);
	};
}

