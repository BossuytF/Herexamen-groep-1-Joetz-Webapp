'use strict';

/**
 * @ngdoc service
 * @name webappApp.blogService
 * @description
 * # blogService
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('BlogService', ['$http', function ($http) {

			var service = {},
			baseUrl = 'http://localhost:8085/';

			function getAll() {
				return $http.get(baseUrl + 'blogs/');
			}

			function create(blog) {
				return $http({
					method : 'POST',
					url : baseUrl + 'blog',
					data : blog
				});
			}

			function get(id) {
				return $http.get(baseUrl + 'blog/' + id)
			}

			service.getAll = getAll;
			service.create = create;
			service.get = get;

			return service;
		}
	]);
