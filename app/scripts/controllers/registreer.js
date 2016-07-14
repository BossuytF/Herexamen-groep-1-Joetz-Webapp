'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:RegistreerCtrl
 * @description
 * # RegistreerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('RegistreerCtrl', ['UserService', '$state', function (UserService, $state) {

			$.material.init();
			var registreer = this;

			registreer.user = {
				naam : '',
				voornaam : '',
				email : '',
				password : '',
				username : '',
				confirmPassword : ''
			};

			registreer.registreer = function () {
				UserService.create(registreer.user).then(function () {
					$.snackbar({
						content : "Account is met success aangemaakt"
					});
					$state.go('login');
				}, function () {
					registreer.error = 'Er bestaat al een gebruiker met deze gegevens';
				});
			};

		}
	]);
