'use strict';

/**
 * @ngdoc service
 * @name webappApp.authentication
 * @description
 * # authentication
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('AuthenticationService', ['localStorageService', '$http', '$rootScope',
		function (localStorageService, $http, $rootScope) {

			var baseUrl = 'http://localhost:8085/';

			var service = {};

			var _user = {
				email : '',
				token : '',
				isAuth : false,
				role : '',
				refreshToken : '',
				eersteLogin : '',
				username : ''
			};

			function init() {
				var authData = localStorageService.get('authData');

				if (authData) {
					_user.token = authData.token;
					_user.refreshToken = authData.refreshToken;

					var decodedToken = jwt_decode(authData.token);

					if ((decodedToken.exp * 1000) < new Date().getTime()) {
						refreshAccessToken().then(function (response) {
							setCredentials(response.data.token.access);
						})
					} else {
						setCredentials(_user.token, _user.refreshToken);
					};

				} else {
					$rootScope.$emit('user:loggedOut');
				}
			}

			function login(email, password) {
				var headers = {};

				return $http({
					method : 'POST',
					url : baseUrl + 'authentication/login',
					headers : headers,
					data : {
						login : email,
						password : password,
						permanent : 'true'
					}
				});
			}

			function refreshAccessToken() {
				return $http({
					method : 'POST',
					url : baseUrl + 'authentication/token',
					data : {
						refreshToken : _user.refreshToken,
					}
				});
			}

			function setCredentials(token, refreshToken) {

				if (refreshToken) {
					localStorageService.set('authData', {
						token : token,
						refreshToken : refreshToken
					});
					_user.refreshToken = refreshToken;
				} else {
					localStorageService.set('authData', {
						token : token
					});
				}
				console.log(localStorageService.get('authData'));

				var decodedToken = jwt_decode(token);

				_user.token = token;
				_user.isAuth = true;
				_user.role = decodedToken.role;
				$rootScope.user = _user;

				$rootScope.$broadcast('user:loggedIn', _user);
			}

			function logout() {
				localStorageService.remove('authData');

				_user.token = '';
				_user.isAuth = false;

				$rootScope.$emit('user:loggedOut');

			}

			service.init = init;
			service.login = login;
			service.setCredentials = setCredentials;
			service.logout = logout;

			return service;

		}
	]);
