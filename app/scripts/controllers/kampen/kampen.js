'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:KampenCtrl
 * @description
 * # KampenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('KampenCtrl', ['KampenService', '$mdToast', '$mdDialog', '$scope', '$state', function (KampenService, $mdToast, $mdDialog, $scope, $state) {
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
					KampenService.remove(id).then(function () {
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

			function medewerkerToewijzen(id) {
				console.log(id)
				$mdDialog.show({
					clickOutsideToClose : true,
					scope : $scope,
					locals : {
						kampId : id
					},
					controller : 'MedewerkersCtrl',
					controllerAs : 'medewerkers',
					preserveScope : true,
					templateUrl : '../../../views/medewerker.toewijzen.html'
				});
			}

			function goToState(id) {
				$state.go('kampdetail', {
					'kampId' : id
				});
			}

			kampen.goToState = goToState;
			kampen.deleteKamp = deleteKamp;
			kampen.medewerkerToewijzen = medewerkerToewijzen;
		}
	]);
