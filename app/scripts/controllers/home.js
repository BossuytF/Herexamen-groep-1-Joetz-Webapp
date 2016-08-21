'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('HomeCtrl', ['blogService', function (blogService) {

			var home = this;

			var COLORS = ['red','green','blue','yellow','purple']
			
			home.blogs = [{
					title : 'TEST1'
				}, {
					title : 'TEST2'
				}, {
					title : 'TEST3'
				}, {
					title : 'TEST3'
				}, {
					title : 'TEST3'
				}, {
					title : 'TEST3'
				}, {
					title : 'TEST3'
				}, {
					title : 'TEST3'
				}, {
					title : 'TEST3'
				}
			];

			/* 			blogService.getAll().then(function (response) {
			home.blogs = response.data.blogs
			}) */
			giveSpans();
			function giveSpans() {
				for (var i = 0; i < home.blogs.length; i++) {
					home.blogs[i].colspan = 2;
					home.blogs[i].rowspan = 2;
				}
			}
		}
	]);
