'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('MainCtrl', ['$rootScope', '$state', 'AuthenticationService', 'UserService',
		function ($rootScope, $state, AuthenticationService, UserService) {

			var main = this;

			var _onUserLoggedIn = function (event, user) {
				$rootScope.user = user;
				deelnemerError();
			};

			var _onUserLoggedOut = function () {
				$rootScope.user = {};
				$state.go('login');
			};

			var logout = function () {
				AuthenticationService.logout();
			};

			$rootScope.$state = $state;

			function init() {
				AuthenticationService.init();
				deelnemerError();
			}

			init();

			function deelnemerError() {
				console.log($rootScope.user)
				if (typeof $rootScope.user != 'undefined') {
					UserService.get($rootScope.user.email).then(function (response) {
						main.userr = response.data;
						if (!main.userr.contactpersoon1.adres.gemeente || !main.userr.contactpersoon2.adres.gemeente || !main.userr.adres.gemeente || !main.userr.geboortedatum) {
							$rootScope.errorDetails = true;
						}
					})
				}
			}

			$rootScope.$on('user:loggedIn', _onUserLoggedIn);
			$rootScope.$on('user:loggedOut', _onUserLoggedOut);
			main.logout = logout;

		}
	]);
