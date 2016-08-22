'use strict';

/**
 * @ngdoc service
 * @name webappApp.blogService
 * @description
 * # blogService
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('blogService', ['$http', function ($http) {

			var service = {},
			baseUrl = 'http://37.139.13.237:8085/';

			function getAll() {
				return $http.get(baseUrl + 'artikel/');
			}

			function create(artikel) {
				return $http({
					method : 'POST',
					url : baseUrl + 'artikel',
					data : artikel
				});
			}

			function get(id) {
				return $http.get(baseUrl + 'artikel/' + id);
			}

			service.getAll = getAll;
			service.create = create;
			service.get = get;

			return service;

		}
	]);
