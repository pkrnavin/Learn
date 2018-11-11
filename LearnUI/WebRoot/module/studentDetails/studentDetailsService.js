// student details service 
learnUIApp.service('studentDetailsService', ['$http', '$q', '$uibModal', function($http, $q, $uibModal) {
	
	// to add in select field 
	var aryNationalities = [
		{ id: 1, code: 'INDIAN', text: 'INDIAN' },
		{ id: 2, code: 'CHINESE', text: 'Chinese' },
		{ id: 3, code: 'RUSSIAN', text: 'Russian' },
		{ id: 4, code: 'MALAYSIAN', text: 'Malaysian' },
		{ id: 5, code: 'INDONESIAN', text: 'Indonesian' },
		{ id: 6, code: 'AMERICAN', text: 'American' }
	];
	
	// to add in radio button, field 
	var aryTransportModes = [
		{ id: 1, code: 'INSTITUTE_VEHICLE', text: 'Institute Vehicle' },
		{ id: 2, code: 'SELF', text: 'Self' }
	];
	
	// to add in checkbox, field 
	var aryInterestedIns = [
		{ id: 1, code: 'BOOKS', text: 'Books', selected: false }, 
		{ id: 2, code: 'SPORTS', text: 'Sports', selected: false }, 
		{ id: 3, code: 'MUSIC', text: 'Music', selected: false }, 
		{ id: 4, code: 'DANCE', text: 'Dance', selected: false }, 
		{ id: 5, code: 'MARTIAL_ARTS', text: 'Martial Arts, Karate, KungFu', selected: false }, 
	];
	
	// custom messages, of field to pass, below adds, tries 
	var aryEmailFieldErrorMessages = [{code: 'email', message: 'Must be in valid email format. '}];
	
	// to get data, for select field 
	this.getNationalities = function() {
		return aryNationalities;
	};
	
	// to get data, for radio button field 
	this.getTransportModes = function() {
		return aryTransportModes;
	};
	
	// to get data, for checkbox, field 
	this.getInterestedIns = function() {
		return aryInterestedIns;
	};
	
	// to get email field error messages; of custom message of field to pass 
	this.getEmailFieldErrorMessages = function() {
		return aryEmailFieldErrorMessages;
	};
	
	// to add OR update student details 
	this.saveStudentDetails = function(joStudentDetails, arySelectedInterestsCodes) {
		var deferredObject = $q.defer();
		var url, joParams;
		
		// parameters adds 
		joParams = {
			firstName: joStudentDetails.firstName, 
			lastName: joStudentDetails.lastName, 
			fatherName: joStudentDetails.fatherName, 
			motherName: joStudentDetails.motherName, 
			address: joStudentDetails.address, 
			email: joStudentDetails.email, 
			phoneNumber: joStudentDetails.phoneNumber, 
			nationality: joStudentDetails.selectedNationality.code, 
			dateOfBirth: joStudentDetails.dateOfBirth.getTime(),  
			transportMode: joStudentDetails.transportMode,  
			interests: arySelectedInterestsCodes.join()
		};
		
		if ( joStudentDetails.studentId === undefined ) {	// add 
			url = './addStudentDetails';
		} else {	// edit 
			url = './updateStudentDetails';
			joParams.studentId = joStudentDetails.studentId;
		}
		
		//console.info('this.saveStudentDetails <> 11111 <> joParams: '+JSON.stringify(joParams));
		
		$http({
			method: 'POST',
			url: url,
			params: joParams
		}).then(function successCallback(response) {
			deferredObject.resolve(response.data);
		}, function errorCallback(response) {
			deferredObject.reject(response);
		});
		
		return deferredObject.promise;
	};
	
	// to get user's student details 
	this.getUserStudentsDetails = function(nLimit, nOffset) {
		var deferredObject = $q.defer();
		
		$http({
			method: 'POST',
			url: './getUserStudentsDetails',
			params: {
				limit: nLimit,
				offset: nOffset
			}
			//params: joParams
		}).then(function successCallback(response) {
			deferredObject.resolve(response.data);
		}, function errorCallback(response) {
			deferredObject.reject(response);
		});
		
		return deferredObject.promise;
	};
	
	// to get user's student details of given `student_id`, 
	this.getUserStudentDetails = function(nStudentId) {
		var deferredObject = $q.defer();
		
		$http({
			method: 'POST',
			url: './getUserStudentDetails',
			params: {
				studentId: nStudentId
			}
		}).then(function successCallback(response) {
			deferredObject.resolve(response.data);
		}, function errorCallback(response) {
			deferredObject.reject(response);
		});
		
		return deferredObject.promise;
	};
	
	// to delete row 
	this.deleteRow = function(nStudentId) {
		var deferredObject = $q.defer();
		
		$http({
			method: 'POST',
			url: './deleteRow',
			params: {
				studentId: nStudentId
			}
		}).then(function successCallback(response) {
			deferredObject.resolve(response.data);
		}, function errorCallback(response) {
			deferredObject.reject(response);
		});
		
		return deferredObject.promise;
	};
	
	// to get student's record history details 
	this.getStudentRecordHistoryDetails = function(nStudentId, nLimit, nOffset) {
		var deferredObject = $q.defer();
		
		$http({
			method: 'POST',
			url: './getStudentRecordHistoryDetails',
			params: {
				studentId: nStudentId, 
				limit: nLimit,
				offset: nOffset
			}
			//params: joParams
		}).then(function successCallback(response) {
			deferredObject.resolve(response.data);
		}, function errorCallback(response) {
			deferredObject.reject(response);
		});
		
		return deferredObject.promise;
	};
	
	
	// to open student record history details 
	this.openStudentRecordHistoryDetails = function(joStudentDetails, joStudentValueSelectFunctions) {
		
		var modalInstance = $uibModal.open({
			templateUrl: 'module/studentDetails/studentRecordHistoryDetails.html',
			controller: 'studentRecordHistoryDetailsController',
			//controllerAs: '$ctrl',
			size: 'lg',
			windowClass: 'luModalXl',
			resolve: {
				studentDetails: function () {
					return joStudentDetails;
				}, 
				joStudentValueSelectFunctions: function() {
					return joStudentValueSelectFunctions;
				}
			}
		});
		
		// below adds error occurs 
		modalInstance.result.then(function() {	// Success
			console.info('modalInstance <> 1111111111');
		}, function() {	// Cancel
			console.info('modalInstance <> 2222222222');
		});
	};
}]);