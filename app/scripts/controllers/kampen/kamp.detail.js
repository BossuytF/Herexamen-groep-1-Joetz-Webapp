'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwkampCtrl
 * @description
 * # NieuwkampCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('DetailKampCtrl', ['KampenService', '$stateParams', '$state', '$mdToast', '$mdDialog', 'InschrijvingService', '$rootScope',
		function (KampenService, $stateParams, $state, $mdToast, $mdDialog, InschrijvingService, $rootScope) {

			var detailkamp = this;

			detailkamp.ingeschreven = false;
			detailkamp.volzet = false;

			detailkamp.kamp = {};

			function getKamp() {
				KampenService.get($stateParams.kampId).then(function (response) {
					detailkamp.kamp = response.data;
					detailkamp.kamp.locatie = response.data.adres.straat + ' ' + response.data.adres.huisnummer + ' ' + response.data.adres.gemeente;
					detailkamp.kamp.startDatum = new Date(response.data.startDatum);
					detailkamp.kamp.eindDatum = new Date(response.data.eindDatum);
					ingeschreven();
					volzet();
				});
			}
			getKamp();

			function ingeschreven() {
				for (var i = 0; i < detailkamp.kamp.inschrijvingen.length; i++) {
					InschrijvingService.get(detailkamp.kamp.inschrijvingen[i]).then(function (response) {
						if (response.data.user == $rootScope.user.id) {
							detailkamp.ingeschreven = true;
						}
					})
				}
			}

			function volzet() {
				if (detailkamp.kamp.inschrijvingen.length >= detailkamp.kamp.maxDeelnemers) {
					detailkamp.volzet = true;
				}
			}

			function age() {
				var age = getAge($rootScope.user.geboortedatum);
				if (detailkamp.kamp.minLeeftijd > age || detailkamp.kamp.maxLeeftijd < age) {
					detailkamp.birthDate = true;
				}
			}

			function getAge(dateString) {
				var today = new Date();
				var birthDate = new Date(dateString);
				var age = today.getFullYear() - birthDate.getFullYear();
				var m = today.getMonth() - birthDate.getMonth();
				if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
					age--;
				}
				return age;
			}
		}
	]);
