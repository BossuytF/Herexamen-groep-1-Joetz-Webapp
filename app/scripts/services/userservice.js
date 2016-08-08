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

			function get(email) {
				return $http.get(baseUrl + 'user/' + email);
			}

			function updateGegevens(username, user) {
				return $http({
					method : 'PUT',
					url : baseUrl + username + '/profile',
					data : {
						email : user.email,
						firstname : user.voornaam,
						lastname : user.naam,
						geboortedatum: user.dob,
						rijksregisternummer: user.rrn
					}
				});
			}

			function updateAdres(username, user) {
				return $http({
					method : 'PUT',
					url : baseUrl + username  + '/adress',
					data : {
						straat : user.straat,
						huisnummer : user.huisnr,
						postcode : user.postcode,
						gemeente : user.gemeente
					}
				});
			}

			function updateMutualiteit(username, user) {
				return $http({
					method : 'PUT',
					url : baseUrl + username + '/details',
					data : {
						codegerechtigde : user.code,
						aansluitingsnr1: user.aansluitingsnr1, 
						aansluitingsnr2: user.aansluitingsnr2
					}
				});
			}

			service.create = create;
			service.getAll = getAll;
			service.get = get;
			service.updateGegevens = updateGegevens;
			service.updateAdres = updateAdres;
			service.updateMutualiteit = updateMutualiteit;

			return service;
		}
	]);
