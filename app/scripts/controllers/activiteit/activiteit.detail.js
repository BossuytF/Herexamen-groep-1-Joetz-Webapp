
'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwactiviteitCtrl
 * @description
 * # NieuwactiviteitCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('ActiviteitenDetailCtrl', ['ActiviteitenService', '$stateParams', '$rootScope', '$mdToast', 'UserService', function (ActiviteitenService, $stateParams, $rootScope, $mdToast, UserService) {

			var activiteiten = this;
			activiteiten.activiteitId = $stateParams.activiteitId;
			var geocoder = new google.maps.Geocoder();
			activiteiten.medewerkerLijst = [];
			
			getActiviteit();

			function zetAanwezig() {
				ActiviteitenService.update(activiteiten.activiteit.id, $rootScope.user.email).then(function (response) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('U bent nu aanwezig op deze activiteit')
						.position('top right')
						.capsule(true))
						$state.reload();
				})
			}

			function isAanwezig() {
				if (typeof activiteiten.activiteit != 'undefined') {
					for (var i = 0; i < activiteiten.activiteit.aanwezigen.length; i++) {
						if (activiteiten.activiteit.aanwezigen[i] === $rootScope.user.id) {
							activiteiten.alAanwezig = true;
						}
					}
				}
			}

			function aantalAanwezigen() {
				//activiteiten.medewerkerLijst = [];
				if (typeof activiteiten.activiteit != 'undefined') {
					activiteiten.aanwezig = activiteiten.activiteit.aanwezigen.length
						UserService.getAll().then(function(response){
							for (var user in response.data){
								for (var usr in activiteiten.activiteit.aanwezigen){
									if (response.data[user].id == activiteiten.activiteit.aanwezigen[usr]){
										activiteiten.medewerkerLijst.push(response.data[user])
									}
								}
							}
					})
				}
			}

			function getActiviteit() {
				if (typeof activiteiten.activiteitId != 'undefined') {
					ActiviteitenService.get(activiteiten.activiteitId).then(function (response) {
						activiteiten.activiteit = response.data;
						aantalAanwezigen();
						isAanwezig();
					});
				}
			}
			
			activiteiten.zetAanwezig = zetAanwezig;
		}
	]);
