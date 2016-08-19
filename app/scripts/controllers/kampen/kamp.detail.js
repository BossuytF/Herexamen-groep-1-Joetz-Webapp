'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwkampCtrl
 * @description
 * # NieuwkampCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('DetailKampCtrl', ['KampenService', '$stateParams', '$state', '$mdToast', '$mdDialog',
		function (KampenService, $stateParams, $state, $mdToast, $mdDialog) {

			var detailkamp = this;

			detailkamp.kamp = {};

			function getKamp() {
				KampenService.get($stateParams.id).then(function (response) {
					detailkamp.kamp = response.data;				
				});
			}
			getKamp();
		}
	]);
