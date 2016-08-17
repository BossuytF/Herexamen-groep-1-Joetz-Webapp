'use strict';

/**
 * @ngdoc service
 * @name webappApp.kampenService
 * @description
 * # kampenService
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('KampenService', function () {
	var service = {},
	baseUrl = 'http://localhost:8085/';

	function getAll() {
		return $http.get(baseUrl + 'kampen');
	}

	function get(id) {
		return $http.get(baseUrl + 'kampen/' + id)
	}
	
	function create(kamp){
		return $http({
			method: 'POST', 
			url: baseUrl + 'kamp', 
			data: kamp		
		})
	};

	service.getAll = getAll;
	service.get = get;
	service.create = create; 
	
	return service;
});
