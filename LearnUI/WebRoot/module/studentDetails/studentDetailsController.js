// student details controller 
learnUIApp.controller('studentDetailsController', ['$scope', '$rootScope', '$timeout', 'studentDetailsService', 'learnuiUtilsFactory', 'messageFactory', function($scope, $rootScope, $timeout, studentDetailsService, learnuiUtilsFactory, messageFactory) {
	//console.info('studentDetailsController <<<<>>>>> 77777777');
	
	//console.info('studentDetailsController <> $scope.$state.current.name: '+$scope.$state.current.name);
	//console.info('studentDetailsController <> $scope.loginUser: '+JSON.stringify($scope.loginUser));
	
	// form fields to set  
	$scope.formStudentDetails = {};
	
	// select field's data to set, to add 
	$scope.aryNationalities = studentDetailsService.getNationalities();
	// radio button field's data to set, to add 
	$scope.aryTransportModes = studentDetailsService.getTransportModes();
	//console.info('$scope.aryTransportModes: '+JSON.stringify($scope.aryTransportModes));
	// checkbox field's data to set, to add 
	$scope.aryInterestedIns = studentDetailsService.getInterestedIns();
	
	// email field error messages, of custom message of field to pass, to add 
	$scope.aryEmailFieldErrorMessages = studentDetailsService.getEmailFieldErrorMessages();
	
	
	/// below rario button default value sets adds tries 
	//$scope.formStudentDetails.transportMode = 'SELF';
	
	// to sets, for grid data 
	$scope.nCountTotalResultsStudentDetails = -1;
	$scope.aryUserStudentDetails = [];
	
	// to highlight, selected row 
	$scope.idxSelectedRow;
	// to highlight selected row, from property 
	$scope.lastSelected;
	// to highlight, selected row from student id 
	$scope.nStudentIdSelectedRow;
	
	// grid loading to adds, 
	$scope.bLoadingGridStudentDetails = false;
	
	// form loading to adds, 
	$scope.bLoadingFormStudentDetails = false;
	
	
	// pagination to set to add;
	/* commented current page number default, to set to checking */
	$scope.gridStudentDetailsPagination = learnuiUtilsFactory.getPaginationSettings(undefined /* count total results */, 5 /* limit */, 1 /* current page */, 3 /* value `5`; max page numbers size */);	// to add limit `10` ROWS 
	
	/* commented, // below adds to cehiing, to try, default page number to sets 
	//$scope.gridStudentDetailsPagination = learnuiUtilsFactory.getPaginationSettings(undefined, 5);*/
	/* commented; below, default values, of pagination settings to set, to adds, to chekcing tries 
	$scope.gridStudentDetailsPagination = learnuiUtilsFactory.getPaginationSettings();*/
	
	// to set, default values in form 
	setFormDefaultValues();
	
	
	// to set datepicker, custom options to try; in `ng-init` below calls tries 
	$scope.dateOfBirthOptions = {
		// to set, starting date of menu in `1-Jan-1991`, to try 
		//initDate: new Date(1991, 01, 01)	// commented, `February` month sets, below to try 
		initDate: new Date(1991, 00, 01),	// to set `January` month, `00` adds to tries,
		//showWeeks: true	// commented, to cehking, override default option, to try
	};
	
	
	
	// to add value, to get selected, values from JSON key `selected` 
	function getSelectedInterestsFromModel() {
		var arySelectedInterests = [], // to add selected JSON, 
			arySelectedInterestCodes = [], // to add selected interest codes 
			joInterset;
		
		//console.info('getSelectedInterestsFromModel() <> 11111111111');
		
		for (var  i = 0; i < $scope.aryInterestedIns.length; i = i + 1) {
			joInterset = $scope.aryInterestedIns[i];
			//console.info('joInterset: '+JSON.stringify(joInterset));
			
			// selected value 
			if ( joInterset.selected ) {
				//console.info('222222 <> selected values <> joInterset.code: '+joInterset.code);
				arySelectedInterests.push(joInterset);	// to add JSON 
				arySelectedInterestCodes.push(joInterset.code);	// to add code 
			}
		}
		
		//console.info('getSelectedInterestsFromModel() <> 3333333 <> arySelectedInterests: '+JSON.stringify(arySelectedInterests));
		//console.info('getSelectedInterestsFromModel() <> 3333333 <> arySelectedInterestCodes: '+arySelectedInterestCodes);
		
		return [arySelectedInterests, arySelectedInterestCodes];
	}
	$scope.getSelectedInterestsFromModel = getSelectedInterestsFromModel;
	
	
	/* to get OR set selected interests, from codes 
	 * edit click, to set selection in form, from selected codes, 
	 * in grid added values to show, to get selected values, of not to selects set in form, thinks to try 
	 */
	function getOrSetSelectedInterestsFromCodes(selectionCodes, bSetSelection) {
		var arySelectedInterests = [], // to add selected JSON, 
			arySelectedInterestCodes = [], // to add selected interest codes 
			joInterset,
			// from parameter, of selected codes, 
			arySelectionCodes = selectionCodes === undefined ? [] : selectionCodes.split(',');
		

		//console.info('getOrSetSelectedInterestsFromCodes() <> 4444444444 <> selectionCodes: '+selectionCodes+' <> bSetSelection: '+bSetSelection);
		
		for (var  i = 0; i < $scope.aryInterestedIns.length; i = i + 1) {
			joInterset = $scope.aryInterestedIns[i];
			//console.info('joInterset: '+JSON.stringify(joInterset));
			
			
			if ( arySelectionCodes.indexOf(joInterset.code) > -1 ) {	// to add get selection interest, details 
				//console.info('555555 <> selected values <> joInterset.code: '+joInterset.code);
				
				// to set selection value, from codes passing;  
				if ( bSetSelection ) {
					//console.info('66666666 <> set selection true <<<<<>>>>>>>');
					joInterset.selected = true;
				}

				arySelectedInterests.push(joInterset);	// to add JSON 
				arySelectedInterestCodes.push(joInterset.code);	// to add code 
			} else if ( bSetSelection ) {	// of set selection, 
				//console.info('777777 <> set select false <<<<<<<>>>>>>');
				// code value NOT IN selection codes, below adds 
				joInterset.selected = false;
			}
		}
		
		//console.info('getOrSetSelectedInterestsFromCodes() <> 88888888 <> arySelectedInterests: '+JSON.stringify(arySelectedInterests));
		//console.info('getOrSetSelectedInterestsFromCodes() <> 88888888 <> arySelectedInterestCodes: '+arySelectedInterestCodes);
		
		return [arySelectedInterests, arySelectedInterestCodes];
	}
	$scope.getOrSetSelectedInterestsFromCodes = getOrSetSelectedInterestsFromCodes;
	
	// to clear selected values, of checkbox  
	function clearInterestSelections() {
		//console.info('clearInterestSelections() <> 9999999');
		
		// to set in form, clear selected values, 
		getOrSetSelectedInterestsFromCodes(undefined, true);
	}
	
	// to get Transport selected datum; of grid added value, respective text (i.e. displaying value) to set 
	$scope.getSelectedTransportFromCode = function(selectedValue) {
		//console.info('$scope.getSelectedTransportFromCode <> 1111111');
		var joSelected;
		
		joSelected = learnuiUtilsFactory.getSelectedDatumFromArrayInJSON($scope.aryTransportModes, 'code', selectedValue);
		
		//console.info('$scope.getSelectedTransportFromCode <> joSelected: '+JSON.stringify(joSelected));
		
		return joSelected;
	};
	//$scope.getSelectedTransportFromCode('INSTITUTE_VEHICLE');	// to commented, adds to cecking tries 
	
	// to get selected Nationality from value; of grid to show 
	$scope.getSelectedNationalityFromCode = function(selectedValue) {
		//console.info('$scope.getSelectedNationalityFromCode <> 222222');
		var joSelected;
		
		joSelected = learnuiUtilsFactory.getSelectedDatumFromArrayInJSON($scope.aryNationalities, 'code', selectedValue);
		
		//console.info('$scope.getSelectedNationalityFromCode <> joSelected: '+JSON.stringify(joSelected));
		
		return joSelected;
	};
	//$scope.getSelectedNationalityFromCode('INDONESIAN');	// to commented, adds to cecking tries  
	
	// button click to rest form 
	$scope.resetForm = function() {
		//console.info('$scope.resetForm <> 111122223333');
		
		// to clear, form 
		clearForm();
		
		// to set, default values in form 
		setFormDefaultValues();
	};
	
	// to clear form values 
	function clearForm() {
		// to set form state new 
		//$scope.formLuStudentDetails.$setPristine();	// commented, adds not working 
		
		// checkbox to clear selection values, to set in form 
		clearInterestSelections();
		
		$scope.formStudentDetails = {};
		
		/* below `pristine`, `untouched` adds, after insert to reset form, adds tries 
		 * Note: in `form` tag `novalidate` adds, of button clicks after, form field error to clears (i.e. browser adds validation), thinks 
		 */
		$scope.formLuStudentDetails.$setPristine();
		$scope.formLuStudentDetails.$setUntouched();
		
		// to set form state new 
		// below `$timeout`, as after reflects to set 
		//$timeout(function() { $scope.formLuStudentDetails.$setPristine() });	// `$timeout` adds not working 
	}
	
	/* to set, default values in form 
	 * Note: of Reset form, to set default values to reflect, in button tag of `type="button"` adds, working 
	 */
	function setFormDefaultValues() {
		// below adds, of radio button, checkbox value set not reflects, so below adds to tries 
		//$scope.formStudentDetails.firstName = '123';
		
		// below radio button default value sets adds tries 
		$scope.formStudentDetails.transportMode = 'SELF';
		
		// to select values in checkbox, to try 
		$scope.formStudentDetails.selectedInterests = 'BOOKS,SPORTS,MUSIC,MARTIAL_ARTS';
		// to set selected values, in form 
		getOrSetSelectedInterestsFromCodes($scope.formStudentDetails.selectedInterests, true);
	}
	
	// to add, Student details to add OR update, ajax call function to call, to add 
	$scope.saveStudentDetails = function() {
		// TODO: to validate form to show message 
		/*console.info('$scope.formLuStudentDetails');
		console.info($scope.formLuStudentDetails);
		console.info('$scope.formLuStudentDetails.$valid: '+$scope.formLuStudentDetails.$valid);*/
		
		//console.info('$scope.saveStudentDetails <> 11111111');
		
		// to get, selected interests of checkbox field 
		var arySelectedInterestsDetails = getSelectedInterestsFromModel(),
			arySelectedInterestsCodes = arySelectedInterestsDetails[1];

		/*console.info('arySelectedInterestsDetails: '+JSON.stringify(arySelectedInterestsDetails));
		console.info('arySelectedInterestsCodes: '+arySelectedInterestsCodes);*/
		
		// Note: button clik form to set submitted state, of form valid the function, to call in directive adds, 
		if ( arySelectedInterestsCodes.length === 0 ) {	// as custom condition of form filed adds, tried 
			//console.info('$scope.saveStudentDetails <> 222222');
			
			// err message to show 
			//messageFactory.showErrorMessageFromCode('MUST_FILL_MANDATORY_FIELDS');
			messageFactory.showErrorMessageFromCode('MUST_VALID_FORM');
		} else {
			// to add 
			//console.info('$scope.saveStudentDetails <> form valid save');
			
			// form loading to show 
			showLoadingFormStudentDetails();
			
			// to add OR update, student details 
			var htppStudentDetailsResult = studentDetailsService.saveStudentDetails($scope.formStudentDetails, arySelectedInterestsCodes);
			htppStudentDetailsResult.then(function(joResponse) {
				//console.info('saveStudentDetails response <> joResponse: '+JSON.stringify(joResponse));
				
				/* commented, to add to select row from studentId 
				// grid selected row, to clear 
				clearSelectedRow();*/
				/* commented, to add highlight selected from index 
				// grid selected row from property, to clear 
				clearSelectedRowFromProperty();*/
				// to clear selected row studentId 
				clearSelectedRowStudentId();
				
				// form loading to hide 
				hideLoadingFormStudentDetails();
				
				if ( ! joResponse.success ) {	// exception occurred 
					// to show message 
					messageFactory.showMessage(joResponse.errorMessage);
				} else {	// success 
					messageFactory.showMessage(joResponse.data.message);
					
					// Note: after form clears grid reload available; of edit after update form values clear, of grid row selected clear, 
					// to clear form, to set default values, after inserts 
					$scope.resetForm();
					
					// to reset to first page; of grid in page `3`, after adds to set 1st page, to adds; Note: after page number, set, grid reload to adds 
					$scope.gridStudentDetailsPagination.resetToFirstPage();
					
					// to reload, grid data 
					$scope.getUserStudentsDetails();
				}
			});
		}
	};
	
	// to get user's student details, of grid data to load 
	$scope.getUserStudentsDetails = function() {
		// grid loading to show 
		showLoadingGridStudentDetails();

		/* commented, to add to select row from studentId 
		// grid selected row, to clear 
		clearSelectedRow();*/
		
		/* commented; as edit row selected, values to set in form, of varies page change, to back the page of selected row available, to highlight to add */
		// to clear selected row studentId 
		clearSelectedRowStudentId();
		
		
		// to gets grid data, user's student details 
		var htppGetUserStudentsDetailsResult = studentDetailsService.getUserStudentsDetails($scope.gridStudentDetailsPagination.limit, $scope.gridStudentDetailsPagination.getOffset());
		htppGetUserStudentsDetailsResult.then(function(joResponse) {
			// to hide loading 
			hideLoadingGridStudentDetails();
			
			if ( ! joResponse.success ) {
				// err
				messageFactory.showMessage(joResponse.errorMessage);
			} else {
				var joResultStudentDetails = joResponse.data.message;
				
				// grid data 
				$scope.aryUserStudentDetails = joResultStudentDetails.studentDetailsData;
				
				// to set pagination, of count total results available, 
				// TODO: below to cheking 
				$scope.gridStudentDetailsPagination.setTotalResultsAndNumberofPages(joResultStudentDetails.totalResults);
				// to set, page's first, last rows count details, to add 
				$scope.gridStudentDetailsPagination.setPaginationResultsPerPage($scope.aryUserStudentDetails.length);
			}
		}, function(err) {
			// error callback
			console.info('errorCallback <> getUserStudentsDetails <> err: '+JSON.stringify(err));
		});
	};
	$scope.getUserStudentsDetails();
	
	// to reload, grid user's student details, 
	$scope.reloadUserStudentDetails = function() {
		//console.info('------ $scope.reloadUserStudentDetails ------');
		$scope.getUserStudentsDetails();
	};
	
	
	// grid, to highlight selected row 
	$scope.setSelectedRow = function(idxRow) {
		//console.info('-------- $scope.setSelectedRow ------');
		$scope.idxSelectedRow = idxRow;
	};
	// to clear selected, row 
	function clearSelectedRow() {
		$scope.idxSelectedRow = undefined;
	}
	
	/* to highlight selected row, in ngRepeat property to adds, from link below adds 
	 * `https://stackoverflow.com/questions/19331779/how-to-highlight-a-selected-row-in-ngrepeat`
	 */
	$scope.setSelectedRowFromProperty = function() {
		//console.info('-------- $scope.setSelectedRowFromProperty -------');
		// to clear last selected row 
		if ( $scope.lastSelected ) {
			clearSelectedRowFromProperty();
		}
		/*console.info('before select <> this');
		console.info(this);
		console.info('before select <> $scope');
		console.info($scope);*/
		
		// in ngRepeat the function to add, `this` refers respective row's `$scope` thinks; to highlight selected row, css class to add 
		this.selectedRowClass = 'gridHighlightSelectedRow';
		$scope.lastSelected = this;
		
		/*console.info('after select <> this');
		console.info(this);
		console.info('after select <> $scope');
		console.info($scope);*/
	};
	// clear selected row, from property 
	function clearSelectedRowFromProperty() {
		if ( $scope.lastSelected ) {
			$scope.lastSelected.selectedRowClass = '';
		}
	}
	
	
	/* Note: Grid row highlight from `studentId`, below tries, to checking 
	 *   - Edit, Delete button click the row to highlight (i.e. column values select not highlight) 
	 *   - Edit clcik values in form to sets, page change back to the page available of edit selected row in the form values available, the row to highlight 
	 *   - of delete clcik, the selected row to highlight, 
	 *   	- `Ok`, the row to delete, grid selection to clear thinks 
	 *   	- `Cancel`, grid the selected row to highlight available, page change (OR) `Refresh` button, grid selection to clear 
	 *   - of edit select values in form, varies row delete clcik below, 
	 *   	- `Ok`, the row to delete form values to clear, grid selection to clear thinks 
	 *   	- `Cancel`, edit selected row to highlight; of page change to checking 
	 *   - of edit in form values available, the selected row highlight not to clears, not available in form of edit values, to clear highlight 
	 */
	// to highlight selected row from student id; Note: from UI button click edit, delete the row to highlight, below function to call, before edit, delete function to call, in UI adds tries, thinks, of the row to highlight, adds, in html comment adds available, thinks 
	$scope.setSelectedRowFromStudentId = function(nStudentId, joStudentDetails) {
		//console.info('$scope.setSelectedRowFromStudentId <> 11111111 <> nStudentId: '+nStudentId+' <> joStudentDetails: '+JSON.stringify(joStudentDetails));
		
		// Note: Also user to free, of already row edit selected, of varies row edit click, to set values in form to try 
		
		//Note: `student_id` to pass, as edit select values in form, of varies row delete select `cancel`, to highlight edit selected row values in form, to add 
		$scope.nStudentIdSelectedRow = nStudentId;
		
		//console.info('$scope.setSelectedRowFromStudentId <> 333333 <> $scope.nStudentIdSelectedRow: '+$scope.nStudentIdSelectedRow);
	};
	// to clear selected, row student id 
	function clearSelectedRowStudentId() {
		//console.info('clearSelectedRowStudentId() <> 3333333');
		/* of edit selected row values in form, not to clear, to tries; 
		 * (i.e. to clear, grid row selected, of grid select, edit row not selected)
		 */ 
		if ( $scope.formStudentDetails.studentId === undefined ) {
			//console.info('clearSelectedRowStudentId() <> 44444');
			$scope.nStudentIdSelectedRow = undefined;
		}
	}
	
	// edit click, to get user's selected student details to set in form 
	$scope.getUserStudentDetails = function(joStudent) {
		//console.info('$scope.getUserStudentDetails <> 222222222');
		
		// form loading to show 
		showLoadingFormStudentDetails();
		
		// to get user's particular student details, of given studentId 
		var htppGetUserStudentDetailsResult = studentDetailsService.getUserStudentDetails(joStudent.studentId);
		htppGetUserStudentDetailsResult.then(function(joResponse) {
			//console.info('$scope.getUserStudentDetails <> 222222 <> joResponse: '+JSON.stringify(joResponse));
			
			// form loading to hide 
			hideLoadingFormStudentDetails();
			
			if ( ! joResponse.success ) {
				// err
				messageFactory.showMessage(joResponse.errorMessage);
			} else {
				// TODO: to set student details in form 
				var joStudentDetails = joResponse.data.message;
				
				// to set value in form 
				setValuesInForm(joStudentDetails);
			}
		});
	};
	
	// to set values in form, 
	function setValuesInForm(joStudentDetails) {
		//console.info('setValuesInForm <> joStudentDetails: '+JSON.stringify(joStudentDetails));
		
		$scope.formStudentDetails.studentId = joStudentDetails.studentId;
		$scope.formStudentDetails.firstName = joStudentDetails.firstName;
		$scope.formStudentDetails.lastName = joStudentDetails.lastName;
		$scope.formStudentDetails.fatherName = joStudentDetails.fatherName;
		$scope.formStudentDetails.motherName = joStudentDetails.motherName;
		$scope.formStudentDetails.address = joStudentDetails.address;
		$scope.formStudentDetails.email = joStudentDetails.emailId;
		$scope.formStudentDetails.phoneNumber = joStudentDetails.phoneNumber;
		
		// to set value in select field 
		var joNationality = $scope.getSelectedNationalityFromCode(joStudentDetails.nationality);
		//console.info('setValuesInForm <> joNationality: '+JSON.stringify(joNationality));
		$scope.formStudentDetails.selectedNationality = joNationality;
		
		//$scope.formStudentDetails.dateOfBirth = joStudentDetails.dateOfBirth.getTime();
		$scope.formStudentDetails.dateOfBirth = new Date(joStudentDetails.dateOfBirthMillis);
		$scope.formStudentDetails.transportMode = joStudentDetails.transport;
		//$scope.aryInterestedIns = joStudentDetails.interests;
		
		// checkbox interests to set selected values, in form 
		getOrSetSelectedInterestsFromCodes(joStudentDetails.interests, true);
	}
	
	// to delte row 
	$scope.deleteRow = function(joStudent) {
		//console.info('$scope.deleteRow <> 22222');
		
		// in `setTimeout` adds, as the button click, selected row to highlight, so below adds, to try, 
		setTimeout(function() {	// commented, in `setSelectedRowFromStudentId` to add to try 
			var bDeleteRow = confirm("Are you sure to delete row?");
			if ( ! bDeleteRow ) {	// cancel 
				/* to highlight row (i.e. edit selected values in form, of varies row `delete` select `Cancel` from `confirm` box, to highlight edit selected row, to add to try); 
				 * Note: grid row the button clcik, after `$scope.setSelectedRowFromStudentId`, the function `edit`, `delete` to call adds tries, below working of before edit selected row to highlight,  
				 */
				if ( $scope.formStudentDetails.studentId !== undefined ) {
					// of edit selected row to highlight, scope value change to reflect, below adds, to try 
					$scope.$apply(function() {
						$scope.setSelectedRowFromStudentId($scope.formStudentDetails.studentId);
					});
				}
			} else {
				// grid loading to show 
				showLoadingGridStudentDetails();
				
				var htppDeleteRowResult = studentDetailsService.deleteRow(joStudent.studentId);
				htppDeleteRowResult.then(function(joResponse) {
					// to hide loading 
					hideLoadingGridStudentDetails();
					
					if ( ! joResponse.success ) {
						// err
						messageFactory.showMessage(joResponse.errorMessage);
					} else {	// success 
						// message to show 
						messageFactory.showMessage(joResponse.data.message);
						
						/* commented grid reload available 
						// to clear selected row studentId 
						//clearSelectedRowStudentId();*/
						
						// to clear form, to set default values, (i.e. of edit form values set, after varies row delete select) 
						$scope.resetForm();
						
						// to reload, grid data 
						$scope.getUserStudentsDetails();
					}
				});
			}
		}, 0);
	};
	
	// to get Student record History Details, in modal, to show to add 
	$scope.openStudentRecordHistoryDetails = function(joStudent) {
		// to show, respective value in grid in modal, the function to pass 
		var joStudentValueSelectFunctions = {
			getSelectedNationalityFromCode: $scope.getSelectedNationalityFromCode, 
			getSelectedTransportFromCode: $scope.getSelectedTransportFromCode, 
			getOrSetSelectedInterestsFromCodes: getOrSetSelectedInterestsFromCodes
		};
		
		studentDetailsService.openStudentRecordHistoryDetails(joStudent, joStudentValueSelectFunctions);
	};
	
	
	// grid loading, to show, hide to add 
	function showLoadingGridStudentDetails() { $scope.bLoadingGridStudentDetails = true; }
	function hideLoadingGridStudentDetails() { $scope.bLoadingGridStudentDetails = false; }
	// grid loading, to show, hide to add 
	function showLoadingFormStudentDetails() { $scope.bLoadingFormStudentDetails = true; }
	function hideLoadingFormStudentDetails() { $scope.bLoadingFormStudentDetails = false; }
		
	// below to call multiple function, of from UI; to add, pagination results per page, below adds tries 
	$scope.callMultipleFunctions = function() {
		console.info('---------- $scope.callMultipleFunctions <> 111122223333 ---------');
	};
}]);


// student details record history details 
learnUIApp.controller('studentRecordHistoryDetailsController', ['$scope', '$rootScope', '$timeout', '$uibModalInstance', 'studentDetails', 'joStudentValueSelectFunctions', 'studentDetailsService', 'learnuiUtilsFactory', 'messageFactory', function($scope, $rootScope, $timeout, $uibModalInstance, studentDetails, joStudentValueSelectFunctions, studentDetailsService, learnuiUtilsFactory, messageFactory) {
	//console.info('studentRecordHistoryDetailsController <> 8888888888888');
	
	// student details 
	$scope.joStudentDetails = studentDetails;
	
	// pagination default settings to get 
	$scope.gridStudentDetailsPagination = learnuiUtilsFactory.getPaginationSettings();
	
	// values added, respective dislpayin value to show in grid to add; student details controller function to pass parameter adds tried 
	$scope.getSelectedNationalityFromCode = joStudentValueSelectFunctions.getSelectedNationalityFromCode;
	$scope.getSelectedTransportFromCode = joStudentValueSelectFunctions.getSelectedTransportFromCode;
	$scope.getOrSetSelectedInterestsFromCodes = joStudentValueSelectFunctions.getOrSetSelectedInterestsFromCodes;

	// grid loading to adds, 
	$scope.bLoadingGridStudentDetails = false;
	
	
	// to close modal to add 
	$scope.ok = function () {
		$uibModalInstance.close();
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
	
	// to get Student Record History Details 
	$scope.getStudentRecordHistoryDetails = function() {
		//console.info('$scope.getStudentRecordHistoryDetails <> 111112222333444555');
		// grid loading to show 
		showLoadingGridStudentDetails();
		
		// to gets grid data, user's student details 
		var htppGetStudentRecordHistoryDetailsResult = studentDetailsService.getStudentRecordHistoryDetails($scope.joStudentDetails.studentId, $scope.gridStudentDetailsPagination.limit, $scope.gridStudentDetailsPagination.getOffset());
		htppGetStudentRecordHistoryDetailsResult.then(function(joResponse) {
			// to hide loading 
			hideLoadingGridStudentDetails();
			
			if ( ! joResponse.success ) {
				// err
				messageFactory.showMessage(joResponse.errorMessage);
			} else {
				var joResultStudentDetails = joResponse.data.message;
				
				// grid data 
				$scope.aryUserStudentDetails = joResultStudentDetails.studentDetailsData;
				
				// to set pagination, of count total results available, 
				// TODO: below to cheking 
				$scope.gridStudentDetailsPagination.setTotalResultsAndNumberofPages(joResultStudentDetails.totalResults);
				// to set, page's first, last rows count details, to add 
				$scope.gridStudentDetailsPagination.setPaginationResultsPerPage($scope.aryUserStudentDetails.length);
			}
		}, function(err) {
			// error callback
			console.info('errorCallback <> getStudentRecordHistoryDetails <> err: '+JSON.stringify(err));
		});
	};
	$scope.getStudentRecordHistoryDetails();
	
	// to reload Student Record History Details 
	$scope.reloadStudentRecordHistoryDetails = function() {
		$scope.getStudentRecordHistoryDetails();
	};
	
	
	// grid loading, to show, hide to add 
	function showLoadingGridStudentDetails() { $scope.bLoadingGridStudentDetails = true; }
	function hideLoadingGridStudentDetails() { $scope.bLoadingGridStudentDetails = false; }
}]);
