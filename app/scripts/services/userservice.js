'use strict';

/**
 * @ngdoc service
 * @name webappApp.UserService
 * @description
 * # UserService
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('UserService', ['$http', 'LocalStorageService',
		function ($http, LocalStorageService) {
			
			var service = {} ,
			baseUrl = 'http://localhost:8085/';
			
			function getAll(){
				return $http.get(baseUrl + 'user/');
			}
			
			function create(user){
				return $http({
					method : 'POST',
					url : baseUrl + 'user',
					data : {
						email : email,
						password : password,
						permanent : 'true'
					}
				});
			}
			
			service.create = create;
			
			return service;
		}
	]);
