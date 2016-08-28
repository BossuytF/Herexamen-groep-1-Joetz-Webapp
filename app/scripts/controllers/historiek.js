'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HistoriekCtrl
 * @description
 * # HistoriekCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('HistoriekCtrl', ['UserService', 'InschrijvingService', 'KampenService', '$mdToast', '$mdDialog', '$scope', '$state', '$rootScope',
		function (UserService, InschrijvingService, KampenService, $mdToast, $mdDialog, $scope, $state, $rootScope) {

			var historiek = this;
			historiek.KampenLijst = [];
			historiek.InschrijvingsLijst = [];
			historiek.detailkamp = {
						naam : 'Je hebt nog geen kampen meegedaan',
						gemeente : '',
						startDatum : '',
						eindDatum : '',
						omschrijving : ''
					};
			historiek.leeg = true;
			function getInschrijvingen() {
				UserService.get($rootScope.user.email).then(function (response) {
					historiek.user = response.data;
					for (var i = 0; i < historiek.user.inschrijvingen.length; i++) {
						InschrijvingService.get(historiek.user.inschrijvingen[i]).then(function (response) {
							historiek.InschrijvingsItem = response.data;
							historiek.InschrijvingsLijst[i] = historiek.InschrijvingsItem;
							KampenService.get(historiek.InschrijvingsItem.kamp).then(function (response) {
								historiek.KampenLijst.push(response.data);
								setKamp();
							});

						});

					}

				});
			}

			getInschrijvingen();

			function setKamp() {
				if (historiek.KampenLijst.length > 0) {
					historiek.leeg = false;
					historiek.selectKamp(historiek.KampenLijst[0]);
					//historiek.Datum = historiek.detailkamp.startDatum.substring(0,10) + " tot " + historiek.detailkamp.eindDatum.substring(0,10);
				}else {
					historiek.leeg = true;
				}
			}
			
			historiek.selectKamp = function (kamp) {
				historiek.detailkamp = kamp;
				historiek.detailkamp.startDatum = new Date(historiek.detailkamp.startDatum);
				historiek.detailkamp.eindDatum = new Date(historiek.detailkamp.eindDatum);
				historiek.detailkamp.locatie = kamp.adres.straat + ' ' + kamp.adres.huisnummer + ' ' + kamp.adres.gemeente;
				//historiek.Datum ="Van " +  new Date(historiek.detailkamp.startDatum) + " tot " + new Date(historiek.detailkamp.eindDatum);
			}
		}
	]);
