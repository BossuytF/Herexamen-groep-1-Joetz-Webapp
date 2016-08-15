'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NieuwactiviteitCtrl
 * @description
 * # NieuwactiviteitCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwactiviteitCtrl', ['ActiviteitenService', function (ActiviteitenService) {
	var nieuwActiviteit = this;

	nieuwActiviteit.activiteit = {
		naam:'',
		locatie:'', 
		datum: undefined
	}

	nieuwActiviteit.createActiviteit = function(){
		ActiviteitenService.create(nieuwActiviteit.activiteit).then(function(response){
			console.log(response)
		})
	}
}]);
