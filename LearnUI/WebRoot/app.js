// declares app; angularjs library module to include in the below array 
var learnUIApp = angular.module('learnUIApp', ['ui.router', 'ui.bootstrap']);

learnUIApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		//console.info('--------- learnUIApp --------');
		
		/* TODO: `$urlRouterProvider`, below to adds 
		 *  - `when` (i.e. address bar url matches, given URL to set, thinks)
		 *  - `otherwise` URL invalid, given URL to sets, thinks
		 *  >> above to add 
		 */
		
		/* to configure, html views controller; of respective url enters, the html sets in `ui-view` place; 
		 * the controller's js file to include in the `index.html`, of library files, `ui-view` declares 
		 */
		$stateProvider
			.state('/login', {
				url: '/login',
				templateUrl: 'module/login/login.html',
				controller: 'loginController',
				title: 'Login'
			})
			.state( '/loginResponse', {
				url: '/loginResponse',
				controller: 'loginResponseController',
				template: '',
				title: 'Login Response'
			})
			.state('/myHome', {
				url: '/myHome',
				templateUrl: 'module/myHome/myHome.html',
				controller: 'myHomeController',
				title: 'My Home'
			})
			// below adds, to cheking, `userLoggedInDetails` to load one time, of transition to page to checking 
			.state('/userTest', {
				url: '/userTest',
				templateUrl: 'module/userTest/userTest.html',
				controller: 'userTestController',
				title: 'User Test'
			})
			/* below adds, to checking, session not exists to in same page, (i.e. user not loggedin, the URL enters, HTML to show) 
			 * the URL to add in `aryLoginHeaderStates` of not requires login, in `aryVerifySessionExistsStates` to add of `sessionNotExists` to same screen
			 */
			.state('/test', {
				url: '/test',
				templateUrl: 'module/test/test.html',
				controller: 'testController',
				title: 'Test'
			});
		
		
		/* Note: below adds, `Login` page html, controller calls; 
		 *   of URL `#/login` enters, of below line 
		 *   	- not available changes as `#!#%2Flogin`, HTML URLEncode value of `/` encode `%2F` 
		 *   	- available changes as `#!/login` 
		 * 
		 * from Angularjs 1.6, in URL `#!/<URL_ROUTE>` to enter, thinks; `!` (i.e. exclamatory) adds in URL, from below link 
		 * https://docs.angularjs.org/guide/migration#commit-aa077e8
		 * 
		 * -- below link, of exclamatory adds in URL 
		 * https://stackoverflow.com/questions/41214312/exclamation-mark-after-hash-in-angularjs-app
		 * -- below link, available of URL changes `#!#%2Flogin` 
		 * https://stackoverflow.com/questions/38455077/angular-force-an-undesired-exclamation-mark-in-url/41223197#41223197
		 * https://stackoverflow.com/questions/50006814/how-do-i-remove-the-exclamation-mark-from-uri-with-angularjs-ui-router
		 * https://stackoverflow.com/questions/41317931/what-does-mean-in-ui-router
		 * https://stackoverflow.com/questions/40478676/i-am-using-angular-and-my-url-always-has-a-exclamation-mark/40478862
		 * >> google search `angularjs ui router exclamatory adds in url` 
		 */
		// of URL route not found, default below transistion thinks 
		$urlRouterProvider.otherwise('/login');
		
		/* below tries, of url given value in 1st parameters transition to `2nd` parameter value, thinks, tried; not working, to try
		 * below, of URL enters `#!/urlWhen`, transistionTo `#!/login` 
		 */
		$urlRouterProvider.when('/urlWhen', '/login');	// working 
		
		
		// TODO: to add `$locationProvider.hashPrefix('');`, of `!` in URL not adds, to try
		/* commented, `!` in URL not adds, of default adds from `Angularjs 1.6`, thinks 
		$locationProvider.hashPrefix('');*/
		
		// TODO: userLoggedIn userHeader in `#/myHome`, loginHeader in `#/login`, `#/loginResponse` to show, to add
		
		$httpProvider.interceptors.push('myInterceptor');
	}
]);


// below after `config`, `run` phase runs thinks; in `config` providers adds; in `run` able to adds `factory`, `service`, thinks 
learnUIApp.run(['$rootScope', '$state', '$stateParams', '$transitions', 'userServices', 'messageFactory', function ($rootScope, $state, $stateParams, $transitions, userServices, messageFactory) {
	//console.info('------- learnUIApp <> run phase -------');
	$rootScope.$state = $state;

	
	// of transition one page to the page, of transition success, below calls 
	$transitions.onSuccess({}, function(transition) {
		var joTransitionToDetails = transition.to();
		
		// to set, screen title, to show in tab; URL's title to set; 
		$rootScope.stateTitle = joTransitionToDetails.title;
		//console.info('$transitions.onSuccess <> joTransitionToDetails.name: '+joTransitionToDetails.name+' <> $rootScope.stateTitle: '+$rootScope.stateTitle);
		
		
		// of URL's to show `userHeader` (i.e. userLoggedIn header to show), of `loginHeader` (i.e. user not loggedIn header to show), below adds tried 
		// to show login header of URL IN `aryLoginHeaderStates` 
		$rootScope.showLoginHeader = function() {
			//console.info('showLoginHeader <> 1111111');
			return userServices.isLoginHeaderState(joTransitionToDetails.name);
		};
		
		// to show userLoggedIn header, of URL NOT IN `aryLoginHeaderStates` 
		$rootScope.showUserHeader = function() {
			//console.info('showUserHeader <> 22222222');
			return userServices.isUserHeaderState(joTransitionToDetails.name);
		};
		
		
		/* TODO: of URL `isLoginHeaderState`, to check session exists, of available transition to `#/myHome` 
		 *   from `Appedo` adds `sessionExists`, to chcek in `#/login`'s controller adds; tried, given state URLs to verify below 
		 * 
		 *  Note: of above, user `Forgot password`, from the screen of user's email sends to set new password, 
		 *    of after times, user has loggedIn, from `Reset Password` link clicks from email, would goes to `#/myHome` page thinks 
		 */
		// below given state URLs, to verify session exists, to transition to home screen (i.e. of URL in `/login`, user's session available to transitionTo home screen), 
		userServices.verifyStateSessionExistsTransitionToHome(joTransitionToDetails.name);
	});
}]);

/* of ajax call error session not exits, to transition to login screen, below adds tries, 
 * from below link, adds 
 * `https://stackoverflow.com/questions/25604748/angularjs-global-http-state-ajax-loader` 
*/
learnUIApp.factory('myInterceptor', function($q, $rootScope, $state) {
	var interceptor = {
		'request': function (config) {
			//console.info('11111111 <> myInterceptor <> request <> config: '+JSON.stringify(config));
			//$rootScope.loading = 1;
			// Successful request method
			return config; // or $q.when(config);
		},
		'requestError': function (rejection) {
			//console.info('22222222 <> myInterceptor <> requestError <> rejection: '+JSON.stringify(rejection));
			// an error happened on the request
			// if we can recover from the error
			// we can return a new request
			// or promise
			//return response; // or new promise
				// Otherwise, we can reject the next
				// by returning a rejection
				// return $q.reject(rejection);
			
			// below from documentation, adds to checking; of request URL `404` `responseError` calls, thinks as `requestError` calls; of 404 `responseError` calls, thinks 
			return $q.reject(rejection);
		},
		'response': function (response) {
			//console.info('33333333 <> myInterceptor <> response <> response: '+JSON.stringify(response));
			//$rootScope.loading = 0;
			// successful response
			return response; // or $q.when(config);
		},
		'responseError': function (rejection) {
			//console.info('44444444 <> myInterceptor <> responseError <> rejection: '+JSON.stringify(rejection));
			// an error happened on the request
			// if we can recover from the error
			// we can return a new response
			// or promise
			//return rejection; // or new promise
				// Otherwise, we can reject the next
				// by returning a rejection
				// return $q.reject(rejection);
			
			//console.info('44444444 <> myInterceptor <> responseError <> rejection.data.includes: '+rejection.data.includes('SESSION_EXPIRED'));
			
			// of session not exists, to transition to `#/login` screen 
			if ( rejection.data.includes('SESSION_EXPIRED') ) {
				//console.info('44444444 <> myInterceptor <> responseError <<<<<>>>>>> SESSION_EXPIRED <> 111111');
				// from `Appedo` adds; URL query string doesn't works with state params, tried `window.location.href` 
				// as error message to show, session not exists, below adds tries; 
				window.location.href = './view/html/#!/loginResponse?_err=SESSION_EXPIRED';
				//console.info('44444444 <> myInterceptor <> responseError <<<<<>>>>>> SESSION_EXPIRED <> 22222');
			}
			
			// Note: below adds, of ajax call sending, errorCallback calls, thinks 
			// below from documentation, adds to checking, tries, of response error, ajax call sending error callback to call, below adds tries 
			return $q.reject(rejection);
		}
	};
	return interceptor;
});