'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:KampenCtrl
 * @description
 * # KampenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('KampenCtrl', ['KampenService', function (KampenService) {
	var kampen = this;
	
	kampen.kampenLijst = [];
	
	function getKampen(){
		KampenService.getAll().then(function(response){
			kampen.kampenLijst = response.data;
		})
	}


}]);
