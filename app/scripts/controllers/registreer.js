'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:RegistreerCtrl
 * @description
 * # RegistreerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('RegistreerCtrl', ['UserService', '$state' , function (UserService, $state) {

			$.material.init();
			var registreer = this;

			registreer.user = {
				naam : '',
				voornaam : '',
				email : '',
				password : '',
				username : '',
				confirmPassword : ''
			}

			registreer.registreer = function () {
				UserService.create(registreer.user).then(function () {
					$.snackbar({content: "This is my awesome snackbar!"});
					$state.go('login');
				})
			}

		}]);
