'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HistoriekCtrl
 * @description
 * # HistoriekCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('HistoriekCtrl', ['UserService', 'InschrijvingService' , 'KampenService','$mdToast', '$mdDialog', '$scope', '$state', '$rootScope', 
function (UserService, InschrijvingService, KampenService, $mdToast, $mdDialog, $scope, $state, $rootScope) {
			var inschrijvingen = this;
			inschrijvingen.KampenLijst = [];
			inschrijvingen.InschrijvingsLijst = [];

			function getInschrijvingen() {
				UserService.get($rootScope.user.email).then(function (response) {
					inschrijvingen.user = response.data;
					for (i = 0; i < inschrijvingen.user.inschrijvingen.length; i++) { 
    InschrijvingService.get(inschrijvingen.user.inschrijvingen[i]).then(function (response) {
    	inschrijvingen.InschrijvingsItem = response.data;
    	inschrijvingen.InschrijvingsLijst[i] = inschrijvingen.InschrijvingsItem;
    	KampenService.get(inschrijvingen.InschrijvingsItem.kamp).then(function (response) {
    	inschrijvingen.KampenLijst[i] = response.data;

				});

				});

}
					
});
			}		
			
			getInschrijvingen();

			function setKamp() {
				if (inschrijvingen.KampenLijst.length > 0) {
					inschrijvingen.detailkamp = KampenLijst[0];
				} else {
					inschrijvingen.detailkamp = {
						naam : 'Je hebt nog geen kampen meegedaan',
						gemeente : '',
						startDatum : '',
						eindDatum : '',
						omschrijving : ''
					};
				}
			}
			setKamp();

			inschrijvingen.selectKamp = function (kamp) {
				inschrijvingen.detailkamp = inschrijving.kamp;
			}
		}
	]);
