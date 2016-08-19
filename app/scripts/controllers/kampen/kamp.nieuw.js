'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwkampCtrl
 * @description
 * # NieuwkampCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwkampCtrl', ['KampenService', '$stateParams', '$state', '$mdToast', '$mdDialog',
		function (KampenService, $stateParams, $state, $mdToast, $mdDialog) {
			var nieuwKamp = this;

			isEdit();

			nieuwKamp.kamp = {
				naam : '',
				omschrijving : '',
				startDatum : undefined,
				eindDatum : undefined,
				aantalDagen : '6',
				aantalNachten : '7',
				vervoer : '',
				prijs : '',
				inbegrepenInPrijs : '',
				maxLeeftijd : '',
				minLeeftijd : '',
				maxDeelnemers : '',
				contact : '',
				sfeerfoto : '',
				straat : '',
				huisnummer : '',
				bus : '',
				gemeente : '',
				postcode : ''
			};

			function isEdit() {
				if ($state.includes('editKamp')) {
					KampenService.get($stateParams.kampId).then(function (response) {
						console.log(response)
						nieuwKamp.kamp = response.data;
					});
				}
			}
			
			function invullen(){
				nieuwKamp.kamp = {
				naam : 'Actievakantie',
				omschrijving : 'Durf jij het aan om samen met je nieuwe vrienden tot het uiterste te gaan? Wil je je grootste angsten overwinnen? In de avontuurlijke omgeving van Vieuxville trotseren we de grootste uitdagingen. Samen met ons professioneel actieteam plaatsen we activiteiten zoals deathride, rotsklimmen, rappel, kajak … op het programma. Hebben deze activiteiten voor jou geen geheimen? Kies dan zeker voor deze actievakantie. Onze activiteiten zijn aangepast aan de leeftijd van de deelnemers.',
				startDatum : new Date('jul 19, 2017'),
				eindDatum : new Date('jul 26, 2017'),
				aantalDagen : '6',
				aantalNachten : '7',
				vervoer : 'busVervoer',
				prijs : '311',
				inbegrepenInPrijs : 'Heen- en terugreis per autocar ,Verblijf in volpension, drank bij de maaltijden,  Dagelijks vieruurtje,  Begeleiding door ervaren, gebrevetteerde monitoren  , Volledig animatiepakket incl. spelmateriaal , Ongevallenverzekering',
				maxLeeftijd : '15',
				minLeeftijd : '11',
				maxDeelnemers : '20',
				contact : 'joetz.west@joetz.be',
				sfeerfoto : 'https://goo.gl/photos/qeKpf18npNpXw8PJA',
				straat : 'Domain de la palogne',
				huisnummer : '5',
				bus : '',
				gemeente : 'Vieuxville',
				postcode : '9000'
			};
			}

			function submitKamp() {
				if ($state.includes('nieuwKamp')) {
					KampenService.create(nieuwKamp.kamp).then(function (response) {					
						$mdToast.show(toastAanmaken);
						$state.go('kampen');
					});
				} else if ($state.includes('editKamp')) {
					$mdDialog.show(confirm).then(function () {
						KampenService.update(nieuwKamp.kamp, $stateParams.kampId).then(function (response) {
							$mdToast.show(toastAanpassen);
						});
					});
				}
			}

			var confirm = $mdDialog.confirm()
				.title('Pas op!')
				.textContent('Wenst u deze wijzigingen op te slaan?')
				.ariaLabel('Pas op')
				.targetEvent()
				.ok('Ja')
				.cancel('Nee');

			var toastAanpassen = $mdToast.simple()
				.textContent('Kamp werd succesvol aangepast')
				.position('start')
				.capsule(true);

				var toastAanmaken = $mdToast.simple()
				.textContent('Kamp werd succesvol aangemaakt')
				.position('start')
				.capsule(true);

				nieuwKamp.submitKamp = submitKamp;

		}
	]);

	

