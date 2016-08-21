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
	baseUrl = 'http://37.139.13.237:8085/';

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
