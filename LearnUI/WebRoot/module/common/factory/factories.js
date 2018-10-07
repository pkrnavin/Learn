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
			{code: 'SESSION_EXPIRED', message: 'Session not exists.'}], 
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