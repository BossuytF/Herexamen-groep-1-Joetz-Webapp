'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwactiviteitCtrl
 * @description
 * # NieuwactiviteitCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('NieuwactiviteitCtrl',['UserService', '$state', '$mdToast', function (UserService, $state, $mdToast) {
    var nieuwactiviteit = this;

			nieuwactiviteit.activiteit = {
				titel : '',
				locatie : '',
				startdatum : '',
				einddatum : '',
				heledag : '',
			};

			nieuwactiviteit.nieuwactiviteit = function () {
				UserService.create(nieuwactiviteit.activiteit).then(function () {
					$mdToast.showSimple("Nieuwe activiteit is met success aangemaakt"); 		
					$state.go('Home');
				}, function () {
					registreer.error = 'Er bestaat al een Activiteit met deze gegevens';
				});
			};
  });
