'use strict';

/**
 * @ngdoc service
 * @name webappApp.inschrijvingservice
 * @description
 * # inschrijvingservice
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('InschrijvingService', [ '$http', function ($http) {

	var service = {},
	baseUrl = 'http://37.139.13.237:8085/';

	function create(inschr) {
		return $http({
			method : 'POST',
			url : baseUrl + 'inschrijving',
			data : inschr
		});
	}
	
	function get(id){
		return $http.get(baseUrl + 'inschrijving/' + id);
	}
	
	service.create = create;
	service.get = get;
	
	return service;

}]);