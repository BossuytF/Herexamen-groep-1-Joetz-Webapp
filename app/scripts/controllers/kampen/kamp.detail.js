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
			
			function ingeschreven(){
				for (var i = 0; i < detailkamp.kamp.inschrijvingen.length; i++){
					InschrijvingService.get(detailkamp.kamp.inschrijvingen[i]).then(function(response){
						if (response.data.user == $rootScope.user.id){
							detailkamp.ingeschreven = true;
						}
					})
				}
				console.log(detailkamp.ingeschreven)
			}
			
			function volzet(){
				if (detailkamp.kamp.inschrijvingen.length >= detailkamp.kamp.maxDeelnemers){
					detailkamp.volzet = true;
				}
				console.log(detailkamp.volzet)
			}
		}
	]);
