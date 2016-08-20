'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwkampCtrl
 * @description
 * # NieuwkampCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('DetailKampCtrl', ['KampenService', '$stateParams', '$state', '$mdToast', '$mdDialog',
		function (KampenService, $stateParams, $state, $mdToast, $mdDialog) {

			var detailkamp = this;

			detailkamp.kamp = {};

			function getKamp() {
				KampenService.get($stateParams.kampId).then(function (response) {
					detailkamp.kamp = response.data;
					detailkamp.kamp.locatie = response.data.adres.straat + ' ' + response.data.adres.huisnummer + ' ' + response.data.adres.gemeente;
					detailkamp.kamp.startDatum = new Date(response.data.startDatum);
					detailkamp.kamp.eindDatum = new Date(response.data.eindDatum);
				});
			}
			getKamp();
		}
	]);
