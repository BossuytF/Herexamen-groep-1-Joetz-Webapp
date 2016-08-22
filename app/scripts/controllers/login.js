'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('LoginCtrl', ['$scope', 'AuthenticationService', '$state', 
		function ($scope, AuthenticationService, $state) {

			var login = this;
			login.user = {
				email : '',
				password : ''
			};

			login.logIn = function () {
				AuthenticationService.login(login.user.email, login.user.password)
				.then(function (response) {
					AuthenticationService.setCredentials(response.data.token.access, response.data.token.refresh);
					$state.go('home')
				}, function () {
					login.error = "Wachtwoord of gebruikersnaam fout";
				});
			};

		}
	]);
