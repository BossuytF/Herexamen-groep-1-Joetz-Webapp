'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('MainCtrl', ['$rootScope', '$state', 'AuthenticationService',
		function ($rootScope, $state, AuthenticationService) {

			var main = this;

			var _onUserLoggedIn = function (event, user) {
				$rootScope.user = user;
				$state.go('home');
			};

			var _onUserLoggedOut = function () {
				$rootScope.user = {};
				$state.go('login');
			};

			var logout = function () {
				AuthenticationService.logout();
			};

			$rootScope.$state = $state;
			
			function init(){
				$.material.init();
			}
			
			init();

			$rootScope.$on('user:loggedIn', _onUserLoggedIn);
			$rootScope.$on('user:loggedOut', _onUserLoggedOut);
			main.logout = logout;

		}
	]);
