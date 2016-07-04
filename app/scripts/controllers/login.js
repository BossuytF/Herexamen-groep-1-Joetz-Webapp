'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('LoginCtrl', ['$scope', 'AuthenticationService', '$rootScope',
		function ($scope, AuthenticationService, $rootScope) {

			var login = this;
			login.user = {
				email : '',
				password : ''
			};

			login.logIn = function () {
				AuthenticationService.login(login.user.email, login.user.password).then(function (response) {
					if (response.token) {
						AuthenticationService.setCredentials(response.access, response.refresh);
						$rootScope.$emit('user:loggedIn');
					} else {
						login.error = "Wachtwoord of gebruikersnaam fout";
					}
				}, function () {});
			};

			$(function () {
				$.material.init();
			});

		}
	]);
