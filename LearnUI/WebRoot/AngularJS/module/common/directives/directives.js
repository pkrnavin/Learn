// directives, to add in the file 

// below adds, logo image, text 
learnUIApp.directive('luLogoImageText', [function() {
	return {
		restrict: 'E',
		templateUrl: 'AngularJS/module/common/view/html/logoImageText.html',
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


// TODO: to add in grid student details 
// loading to add 
learnUIApp.directive('learnuiLoading', ['$compile', function($compile) {
	return {
		restrict: 'A',
		scope: {
			// attribute directive with value, to add, from link `https://stackoverflow.com/questions/28856788/angular-attribute-directive-value`
			bLoading: '=learnuiLoading',
		},
		link: function (scope, elem, attrs) {
			var HTML = '', eleLoadingBackgroundMaskIcon;
			
			// html of `div` loading to add in element, first children 
			HTML += '<div class="loadingBackgroundMaskIcon" ng-show="bLoading">';	// commented `ng-show="bLoading"`, manual show, hide class adds, to try 
			HTML += 	'<div class="loadingBackgroundMask"></div>';	// mask, background not clickable, to add 
			HTML += 	'<div class="loadingIcon">';	// loading icon 
			HTML += 		'<i class="fas fa-spinner fa-pulse fa-3x"></i>';
			HTML += 	'</div>';
			HTML += '</div>';
			
			
			/* from below link, adds, to try 
			 * `https://stackoverflow.com/questions/21452706/append-html-to-an-element-in-directive-and-make-a-local-function-to-interact-wit`
			 */
			// to compile element 
			compileElement(HTML);
			
			// the element to add class; of `position: relative` to set, of `loading` from the parent element to set, 
			elem.addClass("loading");
			
			// to add at first, of loading 
			elem.prepend(HTML);
			
			
			/* below link, of loading to show, hide tries like, thinks 
			 * `https://coderwall.com/p/jyfxkg/angularjs-loading-directive` 
			 */
			
			// TODO: $watch to add `bLoading` 
			/* to add `$watch`, */
			scope.$watch('bLoading', function(newValue, oldValue) {
				//console.info('learnuiLoading <> $watch <> newValue: '+newValue+' <> oldValue: '+oldValue);
				
				// to get element of loading to show, hide to try 
				eleLoadingBackgroundMaskIcon = elem[0].getElementsByClassName('loadingBackgroundMaskIcon');	// commented, below adds 
				
				/* below tries, of loading to show, hide of class add, remove 
				 *   below working of `ng-show` comment in the html, append element; of `ng-show` in element below working, */
				eleLoadingBackgroundMaskIcon = angular.element(eleLoadingBackgroundMaskIcon);
				if ( newValue ) {	// to show loading 
					//console.info('scope.$watch <> show <> 1111111');
					eleLoadingBackgroundMaskIcon.removeClass('hideElement');
				} else {	// to hide loading 
					//console.info('scope.$watch <> hide <> 22222');
					eleLoadingBackgroundMaskIcon.addClass('hideElement');
				}
				
				/* TODO: of scope `loading` value change, to reflect in html; 
				 *   of child element to get `loadingBackgroundMaskIcon`, below to try 
				 * - the element show, hide to add 
				 *   OR
				 * - the element compile to add to try 
				 */
				
				/* commented, of class to add, remove to try; below working, above adds to try 
				/* below link, thinks, of loading value change to compile below link,
				 * `https://stackoverflow.com/questions/20068526/angularjs-directive-does-not-update-on-scope-variable-changes` 
				 * /
				// loading element, to add compile, of scope value change to reflect to try; below working; from link tries 
				compileElement(eleLoadingBackgroundMaskIcon);*/
			});
			
			
			// to compile loading element 
			function compileElement(htmlLoadingBackgroundMaskIcon) {
				//console.info('compileElement <> 111111 <> htmlLoadingBackgroundMaskIcon');
				//console.info(htmlLoadingBackgroundMaskIcon);
				$compile(angular.element(htmlLoadingBackgroundMaskIcon))(scope);
			}
		}
	}
}]);

// grid pagination results, of page's from, to rows count, to display; 
learnUIApp.directive('learnuiPaginationResults', function() {
	
	return {
		restrict: 'E',
		scope: {
			joPaginationSettings: '=paginationSettings'
		},
		template: '<span>{{joPaginationSettings.pageFromRowCount}}-{{joPaginationSettings.pageToRowCount}} of {{joPaginationSettings.countTotalResults}};</span>&nbsp; '+
				'<span>{{joPaginationSettings.currentPage}}/{{joPaginationSettings.numberOfPages}} page(s)</span>'
	};
});

// learnui form fields, controls in functions to set in formField model controller, to add to try 
learnUIApp.directive('learnuiForm', ['learnuiUtilsFactory', function(learnuiUtilsFactory) {
	
	return {
		restrict: 'A',
		require: '^form',
		link: function (scope, element, attrs, formCtrl) {
			// form's fields model controller to gets 
			var aryFormFieldControls = formCtrl.$$controls, 
				joFormFieldCtrl;
			
			//console.info('aryFormFieldControls <> 333333');
			//console.info(aryFormFieldControls);
			
			/* commented, in below not working, in form field's model controller function sets, 
			 *  of value types in `FirstName` field, of the function `denoteFieldValid` of model controller `DateOfBirth` field prints 
			 *  Note: of `this` adds in the function, below working */
			// to set the functions, in form field's model controller, of the field to denote valid, invalid, showErrorMessage 
			for(var i = 0; i < aryFormFieldControls.length; i = i + 1) {
				joFormFieldCtrl = aryFormFieldControls[i];

				// TODO: value change return from function not reflect in ui, to try angularjs custom form controller function value change to reflect in ui, to add to try 
				
				/* Note: below functions `this` to add, of to refers the respective field's model controller, 
				 */
				// to set denoteField valid 
				joFormFieldCtrl.denoteFieldValid = function() {
					//console.info('joFormFieldCtrl.denoteFieldValid <> 111111111');
					//console.info('denoteFieldValid <> this <> 111111111');
					//console.info(this);
					return learnuiUtilsFactory.denoteFieldValid(this);
				};
				// to set denoteField valid 
				joFormFieldCtrl.denoteFieldInvalid = function() {
					//console.info('joFormFieldCtrl.denoteFieldInvalid <> 222222');
					//console.info('denoteFieldInvalid <> this <> 222222');
					//console.info(this);
					return learnuiUtilsFactory.denoteFieldInvalid(this);
				};
				// to set show error message 
				joFormFieldCtrl.showErrorMessage = function() {
					//console.info('joFormFieldCtrl.showErrorMessage <> 333333');
					//console.info('showErrorMessage <> this <> 333333');
					//console.info(this);
					return learnuiUtilsFactory.showErrorMessage(formCtrl, this);
				};
			}
			//console.info('aryFormFieldControls <> after func tion sets <> 44444444');
			//console.info(aryFormFieldControls);
		}
	}
}]);

/* form button click, function to call, of form to set submitted state, of form valid parent controller function to call, to adds, tries 
 * from link `https://medium.com/frontend-coach/when-and-how-to-validate-form-in-angularjs-95e83d6ad41c` adds tried 
 */
learnUIApp.directive('luFormBtnClick', ['messageFactory', function(messageFactory) {
	
	return {
		restrict: 'A',
		require: '^form',
		scope: {
			loadevent: '&luFormBtnClick'
		},
		link: function (scope, element, attrs, formCtrl) {
			//console.info('luFormBtnClick <> 222222222');
			
			// parent controller function to call, 
			//var expressionHandler = scope.loadevent();	// commented, attribute to declare the function, bracket not include (i.e. `lu-form-btn-click="saveStudentDetails"` parent controller function to declare), thinks 
			var expressionHandler = scope.loadevent;	// in the attribute of function bracket to include (i.e. `lu-form-btn-click="saveStudentDetails()"` to declare), thinks 
			
			// element click function to sets 
			element.on('click', handleClick);
			
			// button click function, to call 
			function handleClick() {
				//console.info('handleClick() <> 33333333');
				
				// to set form submitted state 
				formCtrl.$setSubmitted();
				
				if ( ! formCtrl.$valid ) {	// form invalid, error message to show 
					//console.info('handleClick() <> invalid <> 4444444444');
					messageFactory.showErrorMessageFromCode('MUST_VALID_FORM');
				} else {
					//console.info('handleClick() <> valid <> 5555555');
					
					// form valid parent controller function to call 
					expressionHandler();
				}
				
				// below from link adds, 
				// since we've reacted to changes outside of angular's digest loop, 
				// we need to trigger it manually
				scope.$apply();
			}
		}
	};
}]);

// form field error messages, in directive to add, to try 
learnUIApp.directive('luFieldErrorMessage', [function() {
	
	return {
		//restrict: 'AE',	// commented, attribute to add, as error message to show, of css class `invalid-feedback` in adjacent to field, so attribute to add to try
		restrict: 'A',
		require: '^form',
		templateUrl: 'AngularJS/module/common/view/html/luErrorMessage.html',
		scope: {
			formFieldCtrl: '=',	// form field model controller to pass (i.e. `<FORM_NAME>.<FIELD_NAME>`; value in the `name` attribute of form tag for `<FORM_NAME>`, of field for `<FIELD_NAME>` to pass) 
			aryFieldCustomMessages: '=customMessages'	// array to pass of `[{code: '<ERROR_MESSAGE_CODE>', message: '<ERROR_MESSAGE>'}]` 
		},
		link: function (scope, element, attrs, formCtrl) {
			//console.info('luErrorMessage <> 11111111');
			//console.info('luErrorMessage <> formFieldCtrl');
			//console.info(scope.formFieldCtrl);
			//console.info('luErrorMessage <> aryFieldCustomMessages: '+JSON.stringify(scope.aryFieldCustomMessages));
		}
	}
}]);