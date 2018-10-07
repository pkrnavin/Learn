// user loggedin, user home controller 
learnUIApp.controller('myHomeController', ['$scope', '$rootScope', '$state', 'sessionServices', function($scope, $rootScope, $state, sessionServices) {
	//console.info('myHomeController <> 44444444');
	// TODO: form, Grid, add, edit, load edit set values in form, delete to add,
	
	//console.info('myHomeController <> $scope.$state.current.name: '+$scope.$state.current.name);
	
	//console.info('myHomeController <> $scope.loginUser: '+JSON.stringify($scope.loginUser));
	
	/* commented, below adds, `sessionServices`, to cheking tries
	 * below checking tries; in `#/loginResponse`, value sets; in `#/myHome`, value gets, destroy adds 
	 *   - in `#/myHome`, page refresh, value to get 
	 *   - in `#/myHome`, after destroy, value to remove, page refresh, to get `null OR undefined`, to cheking 
	 *   - tab close, in `#/loginResponse` comment value set; from new tab, login, in `#/myHome`, value to get `null OR undefined`, to cheking 
	console.info('myHomeController <> sessionServices.get <> ABC: '+sessionServices.get('ABC'));
	//sessionServices.destroy('ABC');
	//console.info('myHomeController <> after destroy <> sessionServices.get <> ABC: '+sessionServices.get('ABC'));*/
}]);