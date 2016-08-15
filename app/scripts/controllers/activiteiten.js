'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:ActiviteitenCtrl
 * @description
 * # ActiviteitenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('ActiviteitenCtrl', ['ActiviteitenService', '$stateParams', '$rootScope',
		function (ActiviteitenService, $stateParams, $rootScope, $scope) {
			var activiteiten = this;
			activiteiten.activiteit = $stateParams.activiteit;

			aantalAanwezigen();
			isAanwezig();
			getActiviteiten();

			activiteiten.activiteitenLijst = [];

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
					console.log(response)
				})
			}

			function isAanwezig() {
				if (typeof activiteiten.activiteit != 'undefined') {
					for (var i = 0; i < activiteiten.activiteit.aanwezigen.length; i++) {
						if (activiteiten.activiteit.aanwezigen[i])
							activiteiten.alAanwezig = true;
					}
				}
			}

			function aantalAanwezigen() {
				if (typeof activiteiten.activiteit != 'undefined') {
					activiteiten.aanwezig = activiteiten.activiteit.aanwezigen.length
				}
			}

			activiteiten.zetAanwezig = zetAanwezig;

		}
	]);
