// controllers common 
learnUIApp.controller('headerController', ['$scope', '$rootScope', 'userServices', 'messageFactory', function($scope, $rootScope, userServices, messageFactory) {
	//console.info('headerController <> 11111111111');
	
	/* Note: 
	 * - below `loginUserDetails` to show the value in UI, DONT pass the value in ajax call, 
	 *    the value, in java MUST to get from session, to add 
	 */
	// get login user details 
	function getLoginUserDetails() {
		//console.info('headerController <> getLoginUserDetails() <> 22222');
		userServices.getLoginUserDetails(function(joResponse) {
			//console.info('headerController <> joResponse: '+JSON.stringify(joResponse));
			if ( ! joResponse.success ) {
				// err
				messageFactory.showMessage(joResponse.errorMessage);
			} else {
				/* Note:
				 * - in sessionStorage `loginUserDetails` value set, problem occurs, thinks 
				 *   (i.e. of two tabs, in one tab login from a user; in near tab logout, login from varies user of in 1st tab; 
				 *     in 1st tab, of page refresh, in controller the value gets from `sessionStorage`, of before loading `getLoginUserDetails()`, varies value gets, thinks; 
				 *     so in `$rootScope` the value to set, below tries), 
				 * - of `logout` value clears, thinks 
				 */
				$rootScope.loginUser = joResponse.data.message;
				////console.info('headerController <> $scope.loginUser: '+JSON.stringify($scope.loginUser));	// in `$rootScope` adds, in `$scope` prints to checking; value prints, thinks 
				//console.info('headerController <> $rootScope.loginUser: '+JSON.stringify($rootScope.loginUser));
			}
		});
	}
	getLoginUserDetails();
	
	/* Note: below MUST add, 
	 * - in `Appedo`, to add `module` from modal window adds, the window has controller, in the controller to reload cardLayout after `module` adds, of `$rootScope.$on` adds, 
	 *     from cardLayout transition to `details` screen, of controller destory `$rootScope.$on` sets to clear, as in the `details` screen would exists, so to clear MUST to add 
	 * - of session available, below sets in $rootScope.$on `getLoginUserDetails` 
	 *     - URL `#/loginResponse` manually enters, below CALLS, thinks (i.e. not clears in `$rootScope.$on` sets, thinks)
	 *     - URL `#/login` enters, below NOT CALLS, thinks (i.e. clears in `$rootScope.$on` sets, thinks)
	 */
	// in `$rootScope` to set, from controller of requires to load, to add  
	var eventGetLoginUserDetails = $rootScope.$on("getLoginUserDetails", function() {
		//console.info('>>>>>>>> $rootScope.$on <> getLoginUserDetails <> 111122223333');
		getLoginUserDetails();
	});
	// to clear, of scope destroy; of `loginResponse` adds, in `#/myHome` transition the controller initializes of above calls, so multiple time calls; so below adds tried 
	$scope.$on('$destroy', eventGetLoginUserDetails);
	
	// below adds, from menu click to load 
	$scope.loadLoginUserDetails = function() {
		//console.info('loadLoginUserDetails <> 11111');
		getLoginUserDetails();
	};
}]);

// login controller 
learnUIApp.controller('loginController', ['$scope', '$rootScope', '$state', 'sessionServices', 'userServices', 'messageFactory', function($scope, $rootScope, $state, sessionServices, userServices, messageFactory) {
	//console.info('loginController <> 2222222');
	var errorMsgCode = sessionServices.get('errorMsgCode'), 
		successMsgCode = sessionServices.get('successMsgCode');
	
	// below `loginUser`, of after login, logout, value prints in `#/login` to ckecking, 
	//console.info('loginController <> $scope.loginUser: '+JSON.stringify($scope.loginUser));
	
	//console.info('loginController <> errorMsgCode: '+errorMsgCode+' <> successMsgCode: '+successMsgCode);
	
	if ( errorMsgCode !== null && errorMsgCode.length > 0 ) {	// error message 
		//console.info('loginController <> 333333333 <> errorMsgCode');
		// to show respective error message, from code 
		messageFactory.showErrorMessageFromCode(errorMsgCode);
		
		sessionServices.destroy("errorMsgCode");
	} else if ( successMsgCode !== null && successMsgCode.length > 0 ) {	// success message 
		//console.info('loginController <> 4444444 <> successMsgCode');
		
		// to show respective success message, from code 
		messageFactory.showSuccessMessageFromCode(successMsgCode);
		
		sessionServices.destroy("successMsgCode");
	} else {
		// message box, to show to adds, of URL login screen, to tries 
		messageFactory.showMessage('Welcome');
	}
	
	//console.info('loginController <> 44445555666 <> errorMsgCode: '+sessionServices.get('errorMsgCode')+' <> successMsgCode: '+sessionServices.get('successMsgCode'));
}]);

// response from servlet, respective URL's controller 
learnUIApp.controller('loginResponseController', ['$scope', '$rootScope', '$state', '$location', 'sessionServices', function($scope, $rootScope, $state, $location, sessionServices) {
	//console.info('loginResponseController <> 33333333');
	var joURLQueyParams = $location.search();
	//console.info('joURLQueyParams: '+JSON.stringify(joURLQueyParams));
	
	//console.info('loginResponseController <> $scope.$state.current.name: '+$scope.$state.current.name);
	
	// TODO: to show message 
	
	if ( Object.keys(joURLQueyParams).length === 0 ) {	// to go `userHome`, user logged in
		//console.info('11111111 <<<<<>>>>> user logged in');
		// TODO: to call `getLoginUserDetails` 
		
		/* Note: of first from `#/login` of loginSuccess, below in `headerController` `getLoginUserDetails` not calls, 
		 *   as the controller not initialize of `ngIf` adds to show user's header, thinks,
		 *   of transition to `#/myHome`, the controller initialize loads `getLoginUserDetails`, thinks 
		 */
		// to loads, login user details 
		$rootScope.$broadcast("getLoginUserDetails");
		
		$state.transitionTo('/myHome');
	} else {	// to go `login`, user not logged in 
		//console.info('2222222 <<<<<<>>>>>> user not logged in');
		//console.info('joURLQueyParams._err: '+JSON.stringify(joURLQueyParams._err));
		
		if ( joURLQueyParams._err !== undefined ) {
			//console.info('loginResponseController <> errorMsg <> 111111111');
			sessionServices.set('errorMsgCode', joURLQueyParams._err /* + '_' commented, adds, code to return, of code's message not exists, to verification to try */);
		} else if ( joURLQueyParams._smsg !== undefined ) {
			//console.info('loginResponseController <> _smsg <> 22222222');
			sessionServices.set('successMsgCode', joURLQueyParams._smsg /* + '_' */);
			
			/* below of logout value sets to clear adds; 
			 * Note: of `logout` servlet calls response redirects (i.e. page refresh OR reload, thinks), so in value `$rootScope` clears of below not adds thinks, thinks 
			 */
			if ( joURLQueyParams._smsg === 'LOGOUT_SUCCESS' ) {
				//console.info('11111 <> loginResponseController <> LOGOUT_SUCCESS <> $rootScope.loginUser: '+JSON.stringify($rootScope.loginUser));
				$rootScope.loginUser = undefined;
				//console.info('2222 <> loginResponseController <> LOGOUT_SUCCESS <> $rootScope.loginUser: '+JSON.stringify($rootScope.loginUser));
			}
		}
		
		$state.transitionTo('/login');
	}
	
	/* commented, // below adds, to checking `sessionServices` 
	sessionServices.set('ABC', '123');
	console.info('loginResponseController <> sessionServices.get <> ABC: '+sessionServices.get('ABC'));*/
}]);

/* date picker field, to set 
 * of before `JSON.stringify(jo.date)` sets date in UTC, thinks 
 */
learnUIApp.controller('DatepickerPopupController', function($scope) {
	// to set, in datepicker field 
	$scope.datePickerPopup = {
		format: 'dd-MMM-yyyy',
		menuOpen: false, 
		options: {}
	};
	//$scope.format = 'dd-MMM-yyyy';
	
	// default date picker poup menu, options 
	var JO_DEFAULT_DATE_PICKER_OPTIONS = {
		showWeeks: false,
		startingDay: 1	// from `Monday` to starting, to try 
	};
	
	// to open popup menu, of button click, focus field 
	$scope.openPopup = function() {
		$scope.datePickerPopup.menuOpen = true;
	};
	
	// to set default, custom options; in html `ng-init` below calls to set options, to try 
	$scope.setOptions = function(joCustomOptions) {
		//console.info('$scope.setOptions <> 111111');
		//console.info('JO_DEFAULT_DATE_PICKER_OPTIONS: '+JSON.stringify(JO_DEFAULT_DATE_PICKER_OPTIONS));
		//console.info('joCustomOptions: '+JSON.stringify(joCustomOptions));
		//console.info('111111 <> $scope.datePickerPopup.options: '+JSON.stringify($scope.datePickerPopup.options));
		
		$scope.datePickerPopup.options = angular.extend({}, JO_DEFAULT_DATE_PICKER_OPTIONS, joCustomOptions);
		
		//console.info('222222 <> $scope.datePickerPopup.options: '+JSON.stringify($scope.datePickerPopup.options));
	};
});