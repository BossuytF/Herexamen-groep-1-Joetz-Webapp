'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwkampCtrl
 * @description
 * # NieuwkampCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('DetailKampCtrl', ['KampenService', '$stateParams', '$state', '$mdToast', '$mdDialog', 'InschrijvingService', '$rootScope', 'UserService', 
		function (KampenService, $stateParams, $state, $mdToast, $mdDialog, InschrijvingService, $rootScope, UserService) {

			var detailkamp = this;

			detailkamp.ingeschreven = false;
			detailkamp.volzet = false;
			detailkamp.aanwezigeLijst = [];
			detailkamp.medewerkerLijst = [];

			detailkamp.kamp = {};

			function getKamp() {
				KampenService.get($stateParams.kampId).then(function (response) {
					detailkamp.kamp = response.data;
					detailkamp.kamp.locatie = response.data.adres.straat + ' ' + response.data.adres.huisnummer + ' ' + response.data.adres.gemeente;
					detailkamp.kamp.startDatum = new Date(response.data.startDatum);
					detailkamp.kamp.eindDatum = new Date(response.data.eindDatum);
					ingeschreven();
					volzet();
					getMedewerkers();
				});
			}
			getKamp();

			function ingeschreven() {
				for (var i = 0; i < detailkamp.kamp.inschrijvingen.length; i++) {
					InschrijvingService.get(detailkamp.kamp.inschrijvingen[i]).then(function (response) {
						if (response.data.user == $rootScope.user.id) {
							detailkamp.ingeschreven = true;
						}
						//detailkamp.aanwezigeLijst.push(response.data.user);
						UserService.getAll().then(function(users){
							for (var user in users.data){
								if (users.data[user].id == response.data.user){
									detailkamp.aanwezigeLijst.push(users.data[user]);
								}
							}
						})
					})
				}
			}

			function volzet() {
				if (detailkamp.kamp.inschrijvingen.length >= detailkamp.kamp.maxDeelnemers) {
					detailkamp.volzet = true;
				}
			}
			
			function getMedewerkers(){
				UserService.getAll().then(function(response){
					for (var user in response.data){
						for (var usr in detailkamp.kamp.medewerkers){
							if (response.data[user].id == detailkamp.kamp.medewerkers[usr]){
								detailkamp.medewerkerLijst.push(response.data[user])
							}
						}
					}
				})
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
