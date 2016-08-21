'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:InschrijvenCtrl
 * @description
 * # InschrijvenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('InschrijvenCtrl', ['$state', '$mdToast',  '$rootScope', 
function ($state, $mdToast, $rootScope) {

			var inschrijving = this;

			inschrijving.inschr = {
				kampId : '',
				userId : $rootScope.user.id, 
				extraInformatie:'', 
				betaald: false,
				goedgekeurd: false
			};		
			
			function getUser(){
				UserService.get($rootScope.user.id).then(function(response){
					inschrijving.deelnemer = response.data;
					getBetalend();
					getContactpersoon();
				})
			}
			getUser();
			
			function getBetalend(){
				if (inschrijving.deelnemer.contactpersoon1.betalend){
					inschrijving.betalend = inschrijving.deelnemer.contactpersoon1;
				} else if (inschrijving.deelnemer.contactpersoon2.betalend){
					inschrijving.betalend = inschrijving.deelnemer.contactpersoon2;
				}
			}
			
			function getContactpersoon(){
				if (inschrijving.deelnemer.contactpersoon1.ouder){
					inschrijving.contactpersoon = inschrijving.deelnemer.contactpersoon1;
				}else if(inschrijving.deelnemer.contactpersoon2.ouder){
					inschrijving.contactpersoon = inschrijving.deelnemer.contactpersoon2;
				}
			}

/* 			inschrijving.schrijfIn = function () {
				UserService.create(inschrijving.inschrijvings).then(function () {
					AuthenticationService.login()
					.then(function (response) {
						AuthenticationService.setCredentials(response.data.token.access, response.data.token.refresh);
						$mdToast.show(
							$mdToast.simple()
							.textContent('Proficiat ' + registreer.user.voornaam + ' uw account werd succesvol aangemaakt en u werd automatisch ingelogd')
							.position('start')
							.capsule(true))
					});
				}, function () {
					inschrijving.error = 'Er bestaat al een gebruiker met deze gegevens';
				});
			} */

		}
	]);
