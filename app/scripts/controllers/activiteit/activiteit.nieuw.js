'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwactiviteitCtrl
 * @description
 * # NieuwactiviteitCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwactiviteitCtrl', ['$state', '$mdToast', 'ActiviteitenService', '$stateParams',
		function ($state, $mdToast, ActiviteitenService, $stateParams) {
			var nieuwActiviteit = this;
			editActiviteit();

			nieuwActiviteit.activiteit = {
				naam : '',
				locatie : '',
				beginUur : undefined,
				eindUur : undefined,
				heleDag : false,
				datum : undefined
			};

			nieuwActiviteit.myDate = new Date();

			nieuwActiviteit.nieuwactiviteit = function () {

				nieuwActiviteit.activiteit.datum = new Date(nieuwActiviteit.activiteit.beginUur);
				nieuwActiviteit.activiteit.beginUur = new Date(nieuwActiviteit.activiteit.beginUur);
				nieuwActiviteit.activiteit.eindUur = new Date(nieuwActiviteit.activiteit.eindUur);

				if (typeof $stateParams.activiteitId != 'undefined') {
					ActiviteitenService.updateGegevens(nieuwActiviteit.activiteit).then(function () {
						$mdToast.showSimple("Activiteit is met success aangepast");
						$state.go('activiteiten');
					}, function () {
						nieuwActiviteit.error = 'Er bestaat al een Activiteit met deze gegevens';
					});
				}
				else {
					ActiviteitenService.create(nieuwActiviteit.activiteit).then(function () {
						$mdToast.showSimple("Nieuwe activiteit is met success aangemaakt");
						$state.go('activiteiten');
					}, function () {
						nieuwActiviteit.error = 'Er bestaat al een Activiteit met deze gegevens';
					});
				}
			};

			function editActiviteit() {
				if (typeof $stateParams.activiteitId != 'undefined') {
					ActiviteitenService.get($stateParams.activiteitId).then(function (response) {
						nieuwActiviteit.activiteit = response.data;
						nieuwActiviteit.activiteit.beginUur = new Date(response.data.beginUur)
							nieuwActiviteit.activiteit.eindUur = new Date(response.data.eindUur)
					})
				}
			}
		}
	]);
