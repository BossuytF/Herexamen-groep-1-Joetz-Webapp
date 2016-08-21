'use strict';

/**
 * @ngdoc service
 * @name webappApp.kampenService
 * @description
 * # kampenService
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('KampenService', ['$http', function ($http) {
			var service = {},
			baseUrl = 'http://37.139.13.237:8085/';

			function getAll() {
				return $http.get(baseUrl + 'kamp');
			}

			function get(id) {
				return $http.get(baseUrl + 'kamp/' + id);
			}

			function create(kamp) {
				return $http({
					method : 'POST',
					url : baseUrl + 'kamp',
					data : kamp
				});
			}

			function update(kamp, id) {
				return $http({
					method : 'PUT',
					url : baseUrl + 'kamp/' + id,
					data : kamp
				});
			}

			function remove(id) {
				return $http.delete (baseUrl + 'kamp/' + id);
			}

			function addMedewerker(id, email) {
				return $http({
					method : 'POST',
					url : baseUrl + 'kamp/' + id + '/medewerkers/' + email
				});
			}

			function updateAdres(kamp, id) {
				return $http({
					method : 'PUT',
					url : baseUrl + 'kamp/' + id + '/adres',
					data : {
						naamgebouw: kamp.naamgebouw, 
						straat: kamp.straat,
						huisnummer: kamp.huisnummer,
						bus: kamp.bus,
						gemeente: kamp.gemeente, 
						postcode: kamp.postcode
					}
				});
			}

			service.getAll = getAll;
			service.get = get;
			service.create = create;
			service.update = update;
			service.remove = remove;
			service.addMedewerker = addMedewerker;
			service.updateAdres = updateAdres;

			return service;
		}
	]);
