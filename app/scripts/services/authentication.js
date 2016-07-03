'use strict';

/**
 * @ngdoc service
 * @name webappApp.authentication
 * @description
 * # authentication
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('authentication', ['localStorageService', function (localStorageService) {

			var baseUrl = '';

			var service = {};

			var _user = {
				email : '',
				token : '',
				isAuth : false,
				role : '',
				refreshToken : '',
				eersteLogin : ''
			}
			
			service.init = init;
			
			return service;

			function init() {
				var authData = localStorageService.get('authData');

				if (authData) {
					_user.token = authData.token;
					_user.refreshToken = authData.refreshToken;

					getMe().then(function (response) {
						_user.isAuth = true;
						_user.email = response...;
						_user.
					})
				}
			}
			
			

		}
	]);
