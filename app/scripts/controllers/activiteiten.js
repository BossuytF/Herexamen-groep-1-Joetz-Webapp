'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:ActiviteitenCtrl
 * @description
 * # ActiviteitenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('ActiviteitenCtrl', ['ActiviteitenService', '$stateParams', '$rootScope', '$mdToast',
		function (ActiviteitenService, $stateParams, $rootScope, $mdToast) {
			var activiteiten = this;

			activiteiten.activiteitId = $stateParams.activiteitId;
			activiteiten.zetAanwezig = zetAanwezig;
			activiteiten.activiteitenLijst = [];
			
			getActiviteiten();
			getActiviteit();

			function getActiviteiten() {
				ActiviteitenService.getAll().then(function (response) {
					activiteiten.activiteitenLijst = response.data;
					heleDag();
				})
			};

			function heleDag() {
				for (var i = 0; i < activiteiten.activiteitenLijst.length; i++) {
					if (activiteiten.activiteitenLijst[i].heleDag) {
						activiteiten.activiteitenLijst[i].heleDag = "Hele Dag";
					} else {
						activiteiten.activiteitenLijst[i].heleDag = "";
					}
				}
			}

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
						if (activiteiten.activiteit.aanwezigen[i] === $rootScope.user.id){
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
					})
				}
			}
		}
	]);
