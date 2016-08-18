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
				
				
			function medewerkerToewijzen(id){
				$mdDialog.show(toewijzen).then(function(){
					KampenService.updateMedewerkers(id).then(function(response){
						console.log(response)
					})
				})
			}
			
			var toewijzen = {
				clickOutsideToClose: false,
                  scope: $scope,        
                  preserveScope: true,           
                  template: 'vieuws/medewerkers.html',
                  controller: function DialogController($scope, $mdDialog) {
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               }

			kampen.deleteKamp = deleteKamp;
		}
	]);
