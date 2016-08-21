'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MedewerkersCtrl
 * @description
 * # MedewerkersCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MedewerkersCtrl', ['UserService', function (UserService) {
		var medewerkers = this;
		
		medewerkers.medewerkerLijst = [];
		
		function getAllMedewerkers(){
			UserService.getAll().then(function(response){
				for (var i = 0; i < response.data.length; i++){
					if (response.data[i].role === "monitor"){
						medewerkers.medewerkerLijst.push(response.data[i]);
					}
				}
			})
		}
		getAllMedewerkers();
		
		
  }]);
