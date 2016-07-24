'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:RegistreerCtrl
 * @description
 * # RegistreerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('RegistreerCtrl', ['UserService', '$state', '$mdToast', function (UserService, $state, $mdToast) {

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
					$mdToast.showSimple("Account is met success aangemaakt"); 		
					$state.go('login');
				}, function () {
					registreer.error = 'Er bestaat al een gebruiker met deze gegevens';
				});
			};

		}
	]);
