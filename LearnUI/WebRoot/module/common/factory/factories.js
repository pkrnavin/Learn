// factories manager class function to add 


// response message factory 
learnUIApp.factory('messageFactory', function() {
	// success messages 
	var arySuccessMessages = [{code: 'LOGOUT_SUCCESS', message: 'Logged out.\nIt is better to close all other LearnUI window(s).'}], 
		// error messages 
		aryErrorMessages = [
			{code: 'INVALID_USER', message: 'Invalid User, more than one returns.'}, 
			{code: 'PASSWORD_NOT_MATCHES', message: 'Password not macthes.'}, 
			{code: 'USER_NOT_EXISTS', message: 'User not exists.'}, 
			{code: 'SESSION_EXPIRED', message: 'Session not exists.'}, 
			{code: 'MUST_FILL_MANDATORY_FIELDS', message: 'Must fill mandatory fields.'},
			{code: 'MUST_VALID_FORM', message: 'Must be valid form fields.'}
		], 
		nMillisMessageDisplay = 1000 * 5;
	
	// TODO: below to checking, 
	
	// get message 
	function getMessage(aryMessages, code) {
		var message = '', joMessage;
		//console.info('getMessage <> 111122223334445555 <> code: '+code+' <> aryMessages: '+JSON.stringify(aryMessages));
		
		for (var i = 0; i < aryMessages.length; i = i + 1) {
			joMessage = aryMessages[i];
			//console.info('i: '+i+' <> joMessage: '+JSON.stringify(joMessage));
			
			if ( joMessage.code === code ) {
				//console.info('code exists <> 111112223344555 ');
				message = joMessage.message;
				break;
			}
			
			//console.info('for loop, before last');
		}
		//console.info('message: '+message);
		
		// Note: of `messageCode` to returns, of given respective code's message not available, to tries, to checking
		return message || code;
	}
	
	
	return { 
		// gets success message 
		getSuccessMessage: function(successMsgCode) {
			var successMessage;
			//console.info('getSuccessMessage <> 11111 <> successMsgCode: '+successMsgCode);
			
			// get message 
			successMessage = getMessage(arySuccessMessages, successMsgCode);
			//console.info('getSuccessMessage <> successMessage: '+successMessage);
			
			return successMessage;
		},
		// gets error message 
		getErrorMessage: function(errorCode) {
			var defaultErrMessage = 'Problem with services', errorMessage;
			//console.info('getErrorMessage <> 22222 <> errorCode: '+errorCode);
			
			// get message 
			errorMessage = getMessage(aryErrorMessages, errorCode);
			//console.info('getErrorMessage <> errorMessage: '+errorMessage);
			
			return errorMessage;
		}, 
		showSuccessMessageFromCode: function(msgCode) {	// to show, success message from the code 
			//console.info('1111111 <> showSuccessMessageFromCode <> msgCode: '+msgCode);
			// get success message, 
			var message = this.getSuccessMessage(msgCode);
			
			//console.info('showSuccessMessageFromCode <> message: '+message);
			// to show message 
			this.showMessage(message);
		}, 
		showErrorMessageFromCode: function(msgCode) {	// to show, error message from the code
			//console.info('222222 <> showErrorMessageFromCode <> msgCode: '+msgCode);
			// gets error message 
			var message = this.getErrorMessage(msgCode);
			
			//console.info('showErrorMessageFromCode <> message: '+message);
			// to show message 
			this.showMessage(message);
		}, 
		showMessage: function(msg) {	// to show message 
			//console.info('showMessage <> nMillisMessageDisplay: '+nMillisMessageDisplay);
			// message box to show, of mobile tried adds, tries 
			showMessage(msg, nMillisMessageDisplay);
		}
	};
});

// UtilsFactory functions to add 
learnUIApp.factory('learnuiUtilsFactory', function() {
	
	return {
		getSelectedDatumFromArrayInJSON: function(aryData, key, value) {
			var joDatum, joRtnDatum;
			
			//console.info('getSelectedDatumFromArrayInJSON <> aryData: '+JSON.stringify(aryData)+' <> key: '+key+' <> value: '+value);
			
			for(var i = 0; i < aryData.length; i = i + 1) {
				joDatum = aryData[i];
				//console.info('i: '+i+' <> joDatum: '+JSON.stringify(joDatum));
				
				if ( joDatum[key] === value) {
					//console.info('getSelectedDatumFromArrayInJSON <> found');
					joRtnDatum = joDatum;
					break;
				}
			}
			
			return joRtnDatum;
		},
		getPaginationSettings: function(nCountTotalResults, nLimit, nCurrentPage, nMaxSize) {
			// to get pagination settings, to set uib bootstrap pagination tag 
			var joPaginationModel = {};
			
			//console.info('11111111 <> getPaginationSettings');
			//console.info('getPaginationSettings <> parameter <> nCountTotalResults: '+nCountTotalResults+' <> nLimit: '+nLimit+' <> nCurrentPage: '+nCurrentPage+' <> nMaxSize: '+nMaxSize);
			
			// TODO: limit to set default
			
			// default limit 
			nLimit = nLimit || 10;
			// default page number `1` 
			nCurrentPage = nCurrentPage || 1;
			// default page numbers size (i.e. of total `5` pages available, UI `3` page numbers of selectable, to show, thinks)
			nMaxSize = nMaxSize || 3;
			
			//console.info('getPaginationSettings <> nCountTotalResults: '+nCountTotalResults+' <> nLimit: '+nLimit+' <> nCurrentPage: '+nCurrentPage+' <> nMaxSize: '+nMaxSize);
			
			/* Note: `Appedo` slider settings tried 
			 * Pagination settings, manual tried, from below link, seeing; 
			 * `https://stackoverflow.com/questions/10816073/how-to-do-paging-in-angularjs` 
			 */
			joPaginationSettings = {
				countTotalResults: nCountTotalResults, 
				numberOfPages: undefined,
				/* Note: below of JSON creation time, `this` calls error occurs, of inside function working, thinks; below links given 
				 * `https://stackoverflow.com/questions/19659117/invalid-how-to-use-the-this-keyword-in-json` 
				 * `https://stackoverflow.com/questions/2787245/how-can-a-javascript-object-refer-to-values-in-itself`
				//numberOfPages: 10,	// commented, library sets, thinks 
				//numberOfPages: this.getNumberOfPages(),	// commented error occurs 
				//numberOfPages: (function() { this.getNumberOfPages() })(),
				//numberOfPages: (function(self) { self.getNumberOfPages() })(this),	// commented error occurs 
				// TODO: to set number of pages, thinks 
				//numberOfPages: (function() { this.getNumberOfPages() })(),*/
				// Note: of `numberOfPages` key declares, in attribute given, library sets respective value in the key, thinks 
				currentPage: nCurrentPage,
				maxSize: nMaxSize,
				limit: nLimit,	// number of rows to display 
				// page's first, last row count to sets 
				pageFromRowCount: undefined,
				pageToRowCount: undefined,
				getOffset: function() {	// from start index, grid rows to get of given limit count, 
					var nOffset = (this.currentPage - 1) * this.limit;
					//console.info('22222 <> getOffset <> this.currentPage: '+this.currentPage+' <> this.limit: '+this.limit+' <> nOffset: '+nOffset);
					
					// page number, starts with `1`, so below respective to adds, to set in SELECT query, tries 
					return nOffset;
				},
				getNumberOfPages: function() {	// to get number of pages 
					var nNumberOfPages;
					
			        // calculate total pages; `Math.ceil(2.3)` to return `3` (i.e. to round upwards to the nearest integer)
					nNumberOfPages = Math.ceil(this.countTotalResults / this.limit);
					
					//console.info('3333 <> getNumberOfPages <> nNumberOfPages: '+nNumberOfPages);
					
					return nNumberOfPages;	// commented, below checking to try 
					//return 10;	// Note: of value returns, library sets respective, thinks 
				},
				setTotalResultsAndNumberofPages: function(nCountTotalResults) {
					// to set count total 
					this.countTotalResults = nCountTotalResults;
					this.numberOfPages = this.getNumberOfPages();
					//console.info('44444 <> setTotalResultsAndNumberofPages <> this.countTotalResults: '+this.countTotalResults+' <> this.numberOfPages: '+this.numberOfPages);
				},
				setPaginationResultsPerPage: function(nNoOfResultsInPage) {
					/* to set pagination results, of page's displaying rows count of first, last in the page; 
					 *  to call in grid ajax call response, of total results to set, number of results returns for the page, to pass, to set the page's row count details 
					 */
					//console.info('555555 <> setPaginationResultsPerPage');
					var nOffset = this.getOffset();
					
					// `Openmentor` job search adds, page's rows count of `from`, `to` adds, 
					
					// page's first from row count 
					this.pageFromRowCount = nOffset + 1;
					// page's last to row count 
					this.pageToRowCount = (nNoOfResultsInPage + nOffset) || '';
					
					//console.info('setPaginationResultsPerPage <> this.pageFromRowCount: '+this.pageFromRowCount+' <> this.pageToRowCount: '+this.pageToRowCount);
				},
				setPage: function(nPageNumber) {
					// to set page number 
					//console.info('setPage <> 2222 <> nPageNumber: '+nPageNumber);
					this.currentPage = nPageNumber;
				}, 
				resetToFirstPage: function() {
					// to reset to first page, 
					//console.info('resetToFirstPage <<<>>> 111111');
					this.setPage(1);
				}
			};
			
			/* commented, as total numbers of results returns in page, to pass, in ajax call response to call 
			// to set, current page's from, to row count 
			joPaginationSettings.setPaginationResultsPerPage();*/
			
			return joPaginationSettings;
		},
		// to add form in fields, denote field 
		denoteFieldValid: function(formFieldCtrl) {
			return formFieldCtrl.$valid;
		},
		denoteFieldInvalid: function(formFieldCtrl) {
			return formFieldCtrl.$invalid;
		},
		// to show error message in form field modify state OR form submitted state to adds, 
		showErrorMessage: function(formCtrl, formFieldCtrl) {
			return formFieldCtrl.$invalid && (formFieldCtrl.$dirty || formCtrl.$submitted);
		}
	}
});