'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwkampCtrl
 * @description
 * # NieuwkampCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwkampCtrl', ['KampenService', function (KampenService) {
			var nieuwKamp = this;

			nieuwKamp.kamp = {
				naam : '',
				omschrijving : '',
				startDatum : undefined,
				eindDatum : undefined,
				aantalDagen : '',
				aantalNachten : '',
				vervoer : '',
				formule : '',
				basisPrijs : '',
				bondPrijs : '',
				kortingen : '',
				inbegrepenInPrijs : '',
				maxLeeftijd : '',
				minLeeftijd : '',
				maxDeelnemers : '',
				contact : '',
				sfeerfoto : '',
				adres : {
					straat;
					'',
					huisnummer : '',
					bus : '',
					gemeente : '',
					postcode : ''
				}
			}

			function addKamp() {
				KampenService.create(kamp).then(function (response) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('Kamp werd succesvol aangemaakt')
						.position('start')
						.capsule(true))
				}
				state.go('kampen');
				}
				
				nieuwKamp.addKamp = addKamp;

			}
		]);
