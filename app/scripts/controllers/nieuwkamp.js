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
				aantalDagen : '',/** Da wordt toch berekend via start en einddatum?**/
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
					straat : '',
					huisnummer : '',
					bus : '',
					gemeente : '',
					postcode : ''
				}
			};

			function isEdit() {
				if ($state.includes('editKamp')) {
					KampenService.get($stateParams.kampId).then(function (response) {
						nieuwKamp.kamp = response.data;
					});
				}
			}

			function submitKamp() {
				if ($state.includes('nieuwKamp')) {
					KampenService.create(nieuwKamp.kamp).then(function (response) {
						$mdToast.show(toastAanmaken);
					});
				} else if ($state.includes('editKamp')) {
					$mdDialog.show(confirm).then(function () {
						KampenService.update(nieuwKamp.kamp, $stateParams.kampId).then(function (response) {
							$mdToast.show(toastAanpassen);
						});
					});
				}
				state.go('kampen');
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
