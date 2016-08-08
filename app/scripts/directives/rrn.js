'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:rrn
 * @description
 * # rrn
 */
angular.module('webappApp').

directive('rrn', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.rrn = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

            var rrnNumber = parseInt(viewValue.substring(0, 9));
            var modulo = rrnNumber % 97;
            var checkSum = parseInt(viewValue.substring(9, 11));

        if (modulo == (97 - checkSum)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
