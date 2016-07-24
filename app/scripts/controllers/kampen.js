'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:KampenCtrl
 * @description
 * # KampenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('KampenCtrl', function () {
	var kampen = this;

	var kampenlijst = [{
			naam : 'test',
			omschrijving : 'lorifdsf sidufl iudsfsdfiu oihfsfh oifddsf hkjsdf sdf',
			aantalDagen : 5
		}, {
			naam : 'test',
			omschrijving : 'lorifdsf sidufl iudsfsdfiu oihfsfh oifddsf hkjsdf sdf',
			aantalDagen : 5
		}, {
			naam : 'test',
			omschrijving : 'lorifdsf sidufl iudsfsdfiu oihfsfh oifddsf hkjsdf sdf',
			aantalDagen : 5
		}
	];

	kampen.kampenlijst = kampenlijst;

});
