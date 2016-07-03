'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('LoginCtrl', ['$scope',
		function ($scope) {

			var login = this;

			login.logIn = function () {
				console.log('Login clicked');
			};

			$(function () {
				$.material.init();
			});

		}
	]);
