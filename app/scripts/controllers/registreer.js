'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:RegistreerCtrl
 * @description
 * # RegistreerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('RegistreerCtrl', ['UserService', '$state', '$mdToast', 'AuthenticationService', function (UserService, $state, $mdToast, AuthenticationService) {

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
					AuthenticationService.login(registreer.user.email, registreer.user.password)
					.then(function (response) {
						AuthenticationService.setCredentials(response.data.token.access, response.data.token.refresh);
						$mdToast.show(
							$mdToast.simple()
							.textContent('Proficiat ' + registreer.user.voornaam + ' uw account werd succesvol aangemaakt en u werd automatisch ingelogd')
							.position('top right')
							.capsule(true));
					});
				}, function () {
					registreer.error = 'Er bestaat al een gebruiker met deze gegevens';
				});
			};

		}
	]);
