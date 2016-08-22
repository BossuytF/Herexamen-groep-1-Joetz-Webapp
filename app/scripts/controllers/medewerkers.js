'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MedewerkersCtrl
 * @description
 * # MedewerkersCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('MedewerkersCtrl', ['UserService', '$q', '$timeout', 'KampenService',  '$rootScope', function (UserService, $q, $timeout, KampenService, $rootScope) {

			var medewerkers = this;
			var user = {};

			var pendingSearch,
			cancelSearch = angular.noop;
			var cachedQuery,
			lastSearch;
			medewerkers.filterSelected = true;
			medewerkers.toegewezen = [];

			medewerkers.medewerkerLijst = [];

			function getAllMedewerkers() {
				UserService.getAll().then(function (response) {
					for (var i = 0; i < response.data.length; i++) {
/* 						if (response.data[i].role === "medewerker") { */
							user = response.data[i];
							user._lowername = user.firstname.toLowerCase +user.lastname.toLowerCase;
							user.name =user.firstname + ' ' + user.lastname;

							medewerkers.medewerkerLijst.push(user);
					/* 	} */
					}
				})
			}
			getAllMedewerkers();

			function delayedQuerySearch(criteria) {
				console.log(criteria)
				cachedQuery = criteria;
				if (!pendingSearch || !debounceSearch()) {
					cancelSearch();
					return pendingSearch = $q(function (resolve, reject) {
							// Simulate async search... (after debouncing)
							cancelSearch = reject;
							$timeout(function () {
								resolve(querySearch());
								refreshDebounce();
							}, Math.random() * 500, true)
						});
				}
				return pendingSearch;
			}
			medewerkers.delayedQuerySearch = delayedQuerySearch;

			function querySearch(criteria) {
				cachedQuery = cachedQuery || criteria;
				return cachedQuery ? medewerkers.medewerkerLijst.filter(createFilterFor(cachedQuery)) : [];
			}
			medewerkers.querySearch = querySearch;

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
			
			function toewijzen(){
				var usr;
				for (usr in medewerkers.toegewezen){
					KampenService.addMedewerker($rootScope.kampID, medewerkers.medewerkerLijst[usr].email).then(function(response){
						console.log(response);
					})
				}
			}
			medewerkers.toewijzen = toewijzen;

		}
	]);
