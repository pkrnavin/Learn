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
	
	// in grid, screens link to add; below grid of 3 columns to add, to checking of columns 
	$scope.aryGridDataScreens = [
		{ column_1: { link: '/studentDetails', text: 'Student Details' }, column_2: { link: '/userTest', text: 'User Test' }, column_3: { link: '/userTest', text: 'User Test' } },
		{ column_1: { link: '/userTest', text: 'User Test' }, column_2: { link: '/userTest', text: 'User Test' }, column_3: { link: '/userTest', text: 'User Test' } },
		{ column_1: { link: '/test', text: 'Test' }, column_2: { link: '/test', text: 'Test' }, column_3: { link: '/test', text: 'Test' } }
	];
	
	/* commented above to add, as before respective to add 
	// below in grid, of available screen to adds, 
	$scope.aryScreens = [
		{ column_1: { link: '/studentDetails', text: 'Student Details' } }
	];*/
}]);