'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:KampenCtrl
 * @description
 * # KampenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('KampenCtrl', ['KampenService', '$mdToast', '$mdDialog', function (KampenService, $mdToast, $mdDialog) {
			var kampen = this;

			kampen.kampenLijst = [];

			function getKampen() {
				KampenService.getAll().then(function (response) {
					kampen.kampenLijst = response.data;
				});
			}
			getKampen();

			function deleteKamp(id) {
				$mdDialog.show(confirm).then(function () {
					KampenService.delete (id).then(function () {
						$mdToast.show(
							$mdToast.simple()
							.textContent('Kamp werd succesvol verwijderd')
							.position('start')
							.capsule(true));
					});
				});
			}

			var confirm = $mdDialog.confirm()
				.title('Pas op!')
				.textContent('Wenst u dit kamp te verwijderen')
				.ariaLabel('Pas op')
				.targetEvent()
				.ok('Ja')
				.cancel('Nee');

			kampen.deleteKamp = deleteKamp;
		}
	]);
