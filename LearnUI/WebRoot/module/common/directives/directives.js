// directives, to add in the file 

// below adds, logo image, text 
learnUIApp.directive('luLogoImageText', [function() {
	return {
		restrict: 'E',
		templateUrl: 'module/common/view/html/logoImageText.html',
		link: function(scope, element, attr) {
			//console.info('attr.customClass: '+attr.customClass);
			scope.logoClass = {};
			/* below to set, in logo image, text; of given key, to set in respective element; default to sets;
			 *   in elements to set, the element's has css class given in below key 
			 * Note: of below `angular.extend` overrides of css class value given in `jocustomClass` 
			 */
			scope.defaultClass = {
				'logoImageText': '',
				'image': 'imageLg',
				'text': 'textLg'
			};
			// custom class, from attribute to give, of keys above to add, 
			var jocustomClass = JSON.parse(attr.customClass || '{}');
			
			// given parameters, overrides sets value `` 
			angular.extend(scope.logoClass, scope.defaultClass, jocustomClass);
			//console.info('scope.logoClass: '+JSON.stringify(scope.logoClass));
		}
	}
}]);