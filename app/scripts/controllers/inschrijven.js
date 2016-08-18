'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:InschrijvenCtrl
 * @description
 * # InschrijvenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('InschrijvenCtrl', ['UserService', '$state', '$mdToast', 'AuthenticationService', function (UserService, $state, $mdToast, AuthenticationService) {

			var inschrijving = this;

			inschrijving.inschrijving = {
				aansluitingsNrOuder1 : '',
				codeGerechtigde : '',
				aansluitingsNrOuder2 : '',
				rijksregisterNrCont : '',/** alles met cont erbij halen van user**/
				voornaamCont : '',
				naamCont : '',
				straatCont : '',
				huisnummerCont : '',
				busCont : '',
				gemeenteCont : '',
				postcodeCont : '',
				e-mailCont : '',
				telefoonCont : '',
				rijksregisterNrDln : '',
				voornaamDln : '',
				naamDln : '',
				straatDln : '',
				huisnummerDln : '',
				busDln : '',
				gemeenteDln : '',
				postcodeDln : '',
				emailDln : '',
				telefoonDln : '',
				voornaamNood : '',
				naamNood : '',
				telefoonNood : '',
				extraInfo : ''
			};

			registreer.registreer = function () {
				UserService.create(registreer.user).then(function () {
					AuthenticationService.login(registreer.user.email, registreer.user.password)
					.then(function (response) {
						AuthenticationService.setCredentials(response.data.token.access, response.data.token.refresh);
						$mdToast.show(
							$mdToast.simple()
							.textContent('Proficiat ' + registreer.user.voornaam + ' uw account werd succesvol aangemaakt en u werd automatisch ingelogd')
							.position('start')
							.capsule(true))
					});
				}, function () {
					registreer.error = 'Er bestaat al een gebruiker met deze gegevens';
				});
			};

		}
	]);