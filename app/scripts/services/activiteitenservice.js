'use strict';

/**
 * @ngdoc service
 * @name webappApp.activiteitenservice
 * @description
 * # activiteitenservice
 * Service in the webappApp.
 */
angular.module('webappApp')
.service('ActiviteitenService', ['$http', function ($http) {

			var service = {},
			baseUrl = 'http://localhost:8085/';

			function getAll() {
				return $http.get(baseUrl + 'activiteit');
			}

			function create(activiteit) {
				return $http({
					method : 'POST',
					url : baseUrl + 'activiteit',
					data : {
						naam : activiteit.naam,
						datum : activiteit.datum,
						locatie : activiteit.locatie
						/* 						heleDag : activiteit.heleDag,
						beginUur : activiteit.beginUur,
						eindUur : activiteit.eidnUur */
					}
				});
			}

			function update(id, email) {
				return $http({
					method : 'POST',
					url : baseUrl + 'activiteit/' + id + '/aanwezigen/' + email
				});
			}

			function get(id) {
				return $http.get(baseUrl + 'activiteit/' + id);
			}

			service.getAll = getAll;
			service.create = create;
			service.update = update;
			service.get = get;

			return service;
		}
	]);
