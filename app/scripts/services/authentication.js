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

					getMe().then(function (response) {
						_user.isAuth = true;
						_user.email = response.email;
						_user.role = response.role;
						_user.username = response.username;
						_user.naam = response.naam;
						_user.voornaam = response.voornaam;

						$rootScope.$emit('user:loggedIn', _user);
					}, function () {
						$rootScope.$emit('user:loggedOut');
					});
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

			function getMe() {
				var header = {};
				header.Authorization = _user.token;
				header['Content-Type'] = 'application/x-www-form-urlencoded';

				return $http({
					method : 'GET',
					url : baseUrl + '/user/_user.username'
				});
			}

			function setCredentials(token, refreshToken) {
				localStorageService.set('authData', {
					token : token,
					refreshToken : refreshToken
				});

				_user.token = token;
				getMe().then(function (response) {
					_user.isAuth = true;
					_user.email = response.email;
					_user.naam = response.naam;
					_user.voornaam = response.voornaam;
					_user.role = response.role;
					_user.username = response.username;

				}, function (err) {
					console.log(err);
				});

			}

			service.init = init;
			service.login = login;
			service.setCredentials = setCredentials;

			return service;

		}
	]);
