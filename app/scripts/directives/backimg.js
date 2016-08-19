'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:backImg
 * @description
 * # backImg
 */
angular.module('webappApp')
 .directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});​