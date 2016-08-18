'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MedewerkersCtrl
 * @description
 * # MedewerkersCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('MedewerkersCtrl', ['UserService', '$q', function (UserService, $q) {
			var medewerkers = this;

			var pendingSearch,
			cancelSearch = angular.noop;
			var cachedQuery,
			lastSearch;

			medewerkers.medewerkerLijst = [];

			function getAllMedewerkers() {
				UserService.getAll().then(function (response) {
					for (var i = 0; i < response.data.length; i++) {
						if (response.data[i].role === "medewerker") {
							response.data[i]._lowername = response.data[i].firstName.toLowerCase +  response.data[i].lastName.toLowerCase;
							response.data[i].name = response.data[i].firstName + response.data[i].lastName;
							medewerkers.medewerkerLijst.push(response.data[i]);			
						}
					}
				})
			}
			getAllMedewerkers();

			function delayedQuerySearch(criteria) {
				cachedQuery = criteria;
				if (!pendingSearch || !debounceSearch()) {
					cancelSearch();
					return pendingSearch = $q(function (resolve, reject) {
							// Simulate async search... (after debouncing)
							cancelSearch = reject;
							$timeout(function () {
								resolve(self.querySearch());
								refreshDebounce();
							}, Math.random() * 500, true)
						});
				}
				return pendingSearch;
			}

			function querySearch(criteria) {
				cachedQuery = cachedQuery || criteria;
				return cachedQuery ? medewerkers.medewerkerLijst.filter(createFilterFor(cachedQuery)) : [];
			}

			function refreshDebounce() {
				lastSearch = 0;
				pendingSearch = null;
				cancelSearch = angular.noop;
			}

			function debounceSearch() {
				var now = new Date().getMilliseconds();
				lastSearch = lastSearch || now;
				return ((now - lastSearch) < 300);
			}

			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(medewerker) {
					return (medewerker._lowername.indexOf(lowercaseQuery) != -1); ;
				};
			}
			/**

			}
			]);
