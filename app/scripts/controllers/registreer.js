'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:RegistreerCtrl
 * @description
 * # RegistreerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('RegistreerCtrl', function () {

	$.material.init();
	var registreer = this;

	var user = {
		naam : '',
		voornaam : '',
		email : '',
		password : '',
		username : '',
		confirmPassword : ''
	}

});
