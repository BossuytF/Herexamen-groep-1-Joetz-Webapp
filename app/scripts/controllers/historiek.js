'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HistoriekCtrl
 * @description
 * # HistoriekCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('HistoriekCtrl',  ['UserService', '$mdToast', '$mdDialog', '$scope', '$state', function (UserService, $mdToast, $mdDialog, $scope, $state) {
    var inschrijvingen = this;
     $scope.test = 'Hello world!';



			inschrijvingen.InschrijvingsLijst = [];

			function getInschrijvingen() {
				UserService.get($rootScope.user.email).then(function (response) {
					profiel.user = response.data;
					inschrijvingen.InschrijvingsLijst = profiel.user.inschrijvingen;
				});
			}
			getInschrijvingen();
			if (InschrijvingsLijst.length > 0) {var detailkamp = InschrijvingsLijst[0];};
			else {
				var detailkamp ={
					naam: 'Je hebt nog geen kampen meegedaan',
					adres.gemeente: '',
					startDatum: '',
					eindDatum: '',
					omschrijving: ''
			};
			}
			$scope.selectKamp = function(inschrijving) {
			detailkamp = inschrijving.kamp;
			}
  });
