'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('HomeCtrl', ['BlogService', function (BlogService) {

			var home = this;
			
			BlogService.getAll().then(function (response) {
				home.blogs = response.data
			});
		}
	]);
