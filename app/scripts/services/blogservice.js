'use strict';

/**
 * @ngdoc service
 * @name webappApp.blogService
 * @description
 * # blogService
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('blogService', function () {

	var service = {},
	baseUrl = 'http://localhost:8085/';

	function getAll() {
		return $http.get(baseUrl + 'blogs/');
	}

	function create(blog) {
		return $http({
			method : 'POST',
			url : baseUrl + 'blog',
			data : {
				BLOG
			}
		});
	}

	service.getAll = getAll;

});
