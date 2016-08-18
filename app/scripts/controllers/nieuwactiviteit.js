'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwactiviteitCtrl
 * @description
 * # NieuwactiviteitCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwactiviteitCtrl', ['$state', '$mdToast', 'ActiviteitenService', function ($state, $mdToast, ActiviteitenService) {
			var nieuwActiviteit = this;

			nieuwActiviteit.activiteit = {
				naam : '',
				locatie : '',
				beginUur : new Date(),
				eindUur : new Date(),
				heleDag : false,
				datum : undefined
			};

			nieuwActiviteit.nieuwactiviteit = function () {
				
				nieuwActiviteit.activiteit.datum = new Date(nieuwActiviteit.activiteit.beginUur);
				nieuwActiviteit.activiteit.beginUur = new Date(nieuwActiviteit.activiteit.beginUur);
				nieuwActiviteit.activiteit.eindUur = new Date(nieuwActiviteit.activiteit.eindUur);
				
				ActiviteitenService.create(nieuwActiviteit.activiteit).then(function () {
					$mdToast.showSimple("Nieuwe activiteit is met success aangemaakt");
					$state.go('activiteiten');
				}, function () {
					nieuwActiviteit.error = 'Er bestaat al een Activiteit met deze gegevens';
				});
			};
		}]);
