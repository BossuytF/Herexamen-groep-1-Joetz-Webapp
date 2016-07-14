'use strict';

/**
 * @ngdoc service
 * @name webappApp.UserService
 * @description
 * # UserService
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('UserService', ['$http', 
		function ($http) {

			var service = {},
			baseUrl = 'http://localhost:8085/';

			function getAll() {
				return $http.get(baseUrl + 'user/');
			}

			function create(user) {
				return $http({
					method : 'POST',
					url : baseUrl + 'user',
					data : {
						email : user.email,
						password : user.password,
						firstname : user.voornaam,
						lastname : user.naam,
						username : user.username
					}
				});
			}

			service.create = create;
			service.getAll = getAll;

			return service;
		}
	]);
