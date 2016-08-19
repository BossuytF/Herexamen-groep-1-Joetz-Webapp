
'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwactiviteitCtrl
 * @description
 * # NieuwactiviteitCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('ActiviteitenDetailCtrl', ['ActiviteitenService', '$stateParams', '$rootScope', '$mdToast', function (ActiviteitenService, $stateParams, $rootScope, $mdToast) {

			var activiteiten = this;
			activiteiten.activiteitId = $stateParams.activiteitId;
			var geocoder = new google.maps.Geocoder();
			
			getActiviteit();

			function zetAanwezig() {
				ActiviteitenService.update(activiteiten.activiteit.id, $rootScope.user.email).then(function (response) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('U bent nu aanwezig op deze activiteit')
						.position('start')
						.capsule(true))
				})
			}

			function isAanwezig() {
				if (typeof activiteiten.activiteit != 'undefined') {
					for (var i = 0; i < activiteiten.activiteit.aanwezigen.length; i++) {
						console.log(activiteiten.activiteit.aanwezigen)
						console.log($rootScope.user.id)
						if (activiteiten.activiteit.aanwezigen[i] === $rootScope.user.id) {
							activiteiten.alAanwezig = true;
						}
					}
				}
			}

			function aantalAanwezigen() {
				if (typeof activiteiten.activiteit != 'undefined') {
					activiteiten.aanwezig = activiteiten.activiteit.aanwezigen.length
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
