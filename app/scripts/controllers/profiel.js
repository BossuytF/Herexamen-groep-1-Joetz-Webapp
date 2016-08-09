'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:ProfielCtrl
 * @description
 * # ProfielCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('ProfielCtrl', ['$rootScope', '$mdDialog', '$scope', '$state', 'UserService',
		function ($rootScope, $mdDialog, $scope, $state, UserService) {
			var profiel = this;

			profiel.user = {
				naam : '',
				voornaam : '',
				rrn : '',
				email : '',
				dob : '',
				straat : '',
				huisnr : '',
				stad : '',
				postcode : '',
				lid : '',
				nummer1 : '',
				nummer2 : '',
				ouder1 : {
					naam : '',
					voornaam : '',
					email : '',
					rrn : '',
					dob : '',
					straat : '',
					hiusnr : '',
					stad : '',
					postcode : '',
					telefoonNr : ''
				},
				ouder2 : {
					naam : '',
					voornaam : '',
					email : '',
					rrn : '',
					dob : '',
					straat : '',
					hiusnr : '',
					stad : '',
					postcode : '',
					telefoonNr : ''
				}
			}

			getUser();

			profiel.myDate = new Date();
			profiel.dateToday = new Date(
					profiel.myDate.getFullYear(),
					profiel.myDate.getMonth(),
					profiel.myDate.getDate() - 10);

			$scope.$watch('profiel.formGegevens', function (form) {
				if (form) {
					profiel.formGegevens = form;
				}
			});

			$scope.$watch('profiel.formAdres', function (form) {
				if (form) {
					profiel.formAdres = form;
				}
			});

			$scope.$watch('profiel.formMutualiteit', function (form) {
				if (form) {
					profiel.formMutualiteit = form;
				}
			});

			$rootScope.$on('$stateChangeStart',
				function (event, toState, toParams, fromState, fromParams, options) {
				if (profiel.formGegevens && !profiel.formGegevens.$pristine || profiel.formAdres && !profiel.formAdres.$pristine || profiel.formMutualiteit && !profiel.formMutualiteit.$pristine) {
					event.preventDefault();
					$mdDialog.show(confirm).then(function () {
						profiel.formGegevens.$setPristine();
						profiel.formAdres.$setPristine();
						profiel.formMutualiteit.$setPristine();
						$state.go(toState.name)
					});
				}
			});

			var confirm = $mdDialog.confirm()
				.title('Pas op!')
				.textContent('Je hebt dingen aangepast die nog niet opgeslaan zijn, wilt u deze aanpasingen wegsmijten')
				.ariaLabel('Pas op')
				.targetEvent()
				.ok('Ja')
				.cancel('Nee');

			function getUser() {
				UserService.get($rootScope.user.email).then(function (response) {
					profiel.user.naam = response.data.lastname;
					profiel.user.voornaam = response.data.firstname;
					profiel.user.email = response.data.email;
				})
			}

			profiel.opslaanGegevens = function () {
				console.log(profiel.user)
			}

			profiel.opslaanAdres = function () {
				console.log(profiel.user)
			}

			profiel.opslaanMutualiteit = function () {
				console.log(profiel.user)
			}

		}
	]);
