'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:ActiviteitenCtrl
 * @description
 * # ActiviteitenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('ActiviteitenCtrl', ['ActiviteitenService', '$mdDialog', '$mdToast', '$state', 
		function (ActiviteitenService, $mdDialog, $mdToast, $state) {
			var activiteiten = this;

			activiteiten.activiteitenLijst = [];
			getActiviteiten();

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

			function remove(id) {
				$mdDialog.show(confirm).then(function () {
					ActiviteitenService.remove(id).then(function () {
						getActiviteiten();
						$mdToast.show(
							$mdToast.simple()
							.textContent('Activiteit werd succesvol verwijderd')
							.position('start')
							.capsule(true));
					});
				});
			}
			
			function detailAct(id){
				$state.go('activiteitendetail', {'activiteitId': id})
			}

			var confirm = $mdDialog.confirm()
				.title('Pas op!')
				.textContent('Wenst u deze activiteit te verwijderen')
				.ariaLabel('Pas op')
				.targetEvent()
				.ok('Ja')
				.cancel('Nee');

			activiteiten.remove = remove;
			activiteiten.detailAct = detailAct;
		}

	]);
