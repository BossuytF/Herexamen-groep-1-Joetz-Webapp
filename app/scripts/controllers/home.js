'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('HomeCtrl', ['blogService', function (blogService) {

			var home = this;

			function getArtikels() {
				blogService.getAll().then(function (response) {
					home.blogs =  response.data;
				})
			}
			getArtikels();

		}
	]);
