'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HistoriekCtrl
 * @description
 * # HistoriekCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('HistoriekCtrl', ['UserService', '$mdToast', '$mdDialog', '$scope', '$state', '$rootScope', 
function (UserService, $mdToast, $mdDialog, $scope, $state, $rootScope) {
			var inschrijvingen = this;

			inschrijvingen.InschrijvingsLijst = [];

			function getInschrijvingen() {
				UserService.get($rootScope.user.email).then(function (response) {
					inschrijvingen.user = response.data;
					inschrijvingen.InschrijvingsLijst = inschrijvingen.user.inschrijvingen;
				});
			}
			getInschrijvingen();

			function setKamp() {
				if (inschrijvingen.InschrijvingsLijst.length > 0) {
					inschrijvingen.detailkamp = InschrijvingsLijst[0];
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
			setkamp();

			inschrijvingen.selectKamp = function (inschrijving) {
				inschrijvingen.detailkamp = inschrijving.kamp;
			}
		}
	]);
