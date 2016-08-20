'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('NieuwBlogCtrl', ['blogService', '$mdToast', function (blogService, $mdToast) {

			var nieuwBlog = this;
			
			nieuwBlog.blog = {
				titel : '',
				tekst: '', 
				foto: ''
			};

			function nieuwBlogs(){
				blogService.create(nieuwBlog.blog).then(function(response){
					$mdToast.show(toastAanmaken);
					$state.go('home')
				});
			}
			nieuwBlog.nieuwBlogs = nieuwBlogs;
			
			var toastAanmaken = $mdToast.simple()
				.textContent('Artikel werd succesvol aangemaakt')
				.position('start')
				.capsule(true);


		}
	]);