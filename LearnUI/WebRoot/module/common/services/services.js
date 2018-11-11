// user services 
learnUIApp.service('userServices', ['$http', '$q', '$state', 'messageFactory', function($http, $q, $state, messageFactory){
	// below adds, to try, respective `userHeader`, `loginHeader` to show, of user `loggedin`, `not loggedin` 
	var aryLoginHeaderStates = ['/login', '/loginResponse', '/test'], 
		// below given URLs, to verify session exists, of available transition to `home` screen, to add; in `app.js` run to verify of below URL 
		aryVerifySessionExistsStates = ['/login'];	// commented `'/test'`, adds to checking session not exists to in same page 
	
	
	// get user login details 
	this.getLoginUserDetails = function(callbackFn) {
		$http({
			method: 'POST',
			url: './getLoginUserDetails' /* + '_' // of ajax call global request, response intercepts `requestError` 404 to call adds the string, to checking to try; Note: `responseError` calls of 404 thinks */ 
		}).then(function successCallback(response) {
			// success callback 
			//console.info('userServices <> successCallback <> 11111');
			if(callbackFn instanceof Function) {
				//console.info('userServices <> successCallback <> 2222222');
				callbackFn(response.data);
			}
		}, function errorCallback(response) {
			// error callback
			console.info('errorCallback <> getLoginUserDetails <> response: '+JSON.stringify(response));
		});
	};
	
	// to check, session exists 
	this.validateLoginUser = function() {
		var deferredObject = $q.defer();
		$http({
			method: 'POST',
			url: './isSessionExists',
		}).then(function successCallback(response) {
			deferredObject.resolve(response.data);
		}, function errorCallback(response) {
			deferredObject.reject(response);
		});
		
		return deferredObject.promise;
	};
	
	
	// of URL, is login header, to show 
	this.isLoginHeaderState = function(stateName) {
		//console.info('this.isLoginHeaderState <> stateName: '+stateName+' <> aryLoginHeaderStates.indexOf: '+aryLoginHeaderStates.indexOf(stateName)+' <> show: '+(aryLoginHeaderStates.indexOf(stateName) >= 0));
		return aryLoginHeaderStates.indexOf(stateName) >= 0;
	};
	
	// of URL, is user header (i.e. the state NOT IN loginHeader states), to show 
	this.isUserHeaderState = function(stateName) {
		//console.info('this.isUserHeaderState <> stateName: '+stateName+' <> aryLoginHeaderStates.indexOf: '+aryLoginHeaderStates.indexOf(stateName)+' <> show: '+(aryLoginHeaderStates.indexOf(stateName) === -1));
		return aryLoginHeaderStates.indexOf(stateName) === -1;
	};
	
	// transition to home screen, if session exists 
	this.transitionToHomeIfSessionExists = function() {
		//console.info('transitionToHomeIfSessionExists <> 33333333333');
		var htppSessionResult = this.validateLoginUser();
		htppSessionResult.then(function(data) {
			//console.info('transitionToHomeIfSessionExists <> data: '+JSON.stringify(data));
			
			if ( ! data.success ) {	// user not loggedin; of session not available, to in same screen 
				//console.info('transitionToHomeIfSessionExists <> isSessionExists <> session not exists <<<>>>>>> 111111');
				//messageFactory.showMessage(data.errorMessage);
			} else {	// user loggedin, transition to home screen 
				//console.info('transitionToHomeIfSessionExists <> isSessionExists <> session exists <<<>>>> 222222');
				$state.transitionTo('/loginResponse');
			}
		});
	};
	
	// to verify, of given state URL (i.e. URL in `#/login`, `#/userSignUp`) has session exists, to transition to `home`, in `learnUIApp.run(...)`, to call 
	this.verifyStateSessionExistsTransitionToHome = function(stateName) {
		//console.info('verifyStateSessionExistsTransitionToHome <> 1111111 <> stateName: '+stateName);
		
		// of given URLs, to verify session exists, of available to transitionTo `home` screen 
		if ( aryVerifySessionExistsStates.indexOf(stateName) >= 0 ) {
			//console.info('verifyStateSessionExistsTransitionToHome <> 22222222');
			this.transitionToHomeIfSessionExists();
		}
	};
	
}]);

/* UtilsFactory functions, of injector nill, below to adds, tries 
 * as from link in `$provide.decorator('$state' ...)` to add, for `Ctrl + link` to open in new tab URL path to append, to try, as inject error throws thinks, 
 *   so inject nill below to adds, to tries 
 */
learnUIApp.service('utilsFactoryInjectNillServices', [function() {
	
	/* to get absolute URL path after root name, to returns, 
	 * (i.e. of URL `http://localhost:8080/LearnUI/view/html/#!/myHome`, to return `/view/html/`) 
	 * of `Ctrl + Link`, to open the link in new tab, URL path to append, to get URL path, below adds tries 
	 */
	this.getAbsoluteURLPathAfterRoot = function() {
		var joLocation = window.location, 
			// rootURL path name, `contextRoot` thinks, 
			rootURLPathName = '/LearnUI', nRootURLPathLength = rootURLPathName.length, 
			// from URL, to get path 
			absoluteURLPathAfterRoot = joLocation.pathname.substring(rootURLPathName.length, joLocation.pathname.length);
		
		//console.info('getAbsoluteURLPathAfterRoot <> joLocation: '+JSON.stringify(joLocation));
		//console.info('rootURLPathName: '+rootURLPathName+' <> nRootURLPathLength: '+nRootURLPathLength+' <> absoluteURLPathAfterRoot: '+absoluteURLPathAfterRoot);
		
		return absoluteURLPathAfterRoot;
	};
	
	
	/* to open link in new tab of `Ctrl + link`, URL after root path to appends, below adds, tries
	 * params: `state` of `$state` to pass, as inject nill to adds 
	 */
	this.getTransitionToURLState = function(state, stateName, params) {
		// returns transitionTo URL 
		var hrefTransitionToState = state.href(stateName, params),
			// to get URL path after root name, 
			absoluteURLPathAfterRoot = this.getAbsoluteURLPathAfterRoot(), 
			URI;
		
		// from URL path, to append transitionTo link, as new tab to open link, to add, to try 
		URI = '.' + absoluteURLPathAfterRoot + hrefTransitionToState;
		
		//console.info('getTransitionToURLState <> hrefTransitionToState: '+hrefTransitionToState);
		//console.info('getTransitionToURLState <> URI: '+URI);
		
		return URI;
	};
}]);

/* in browser in tab, `sessionStorage` to set values, tab close value clears, thinks  
 * Note: value sets in below, after refresh same value gets, 
 */ 
learnUIApp.factory('sessionServices', [function(){
	return {
		set: function(key,value) {
			sessionStorage.setItem(key, value);
		},
		get: function(key) {
			return sessionStorage.getItem(key);
		},
		destroy: function(key) {
			sessionStorage.removeItem(key);
		}
	};
}]);