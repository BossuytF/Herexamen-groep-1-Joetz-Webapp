'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:KampenCtrl
 * @description
 * # KampenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('KampenCtrl', ['KampenService', '$mdToast', '$mdDialog', '$scope', '$state', '$rootScope', function (KampenService, $mdToast, $mdDialog, $scope, $state, $rootScope) {
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
							.position('top right')
							.capsule(true));
							getKampen();
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
				$rootScope.kampID = id;
				$mdDialog.show({
					clickOutsideToClose : true,
					scope : $scope,
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
