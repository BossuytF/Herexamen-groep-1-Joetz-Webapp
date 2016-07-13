'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:password
 * @description
 * # password
 */
angular.module('webappApp').
directive('compareTo', function () {
	return {
		require : 'ngModel',
		scope : {
			otherModelValue : "=compareTo"
		},
		link : function (scope, element, attributes, ngModel) {
			ngModel.$validators.compareTo = function (modelValue, viewValue) {

				return modelValue == scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function () {
				ngModel.$validate();
			});
		}
	};
});
