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

			profiel.edit = true;

			profiel.user = {
				lastname : '',
				firstname : '',
				rijksregisternummer : '',
				email : '',
				geboortedatum : undefined,
				codegerechtigde : '',
				lid : false,
				adres : {
					straat : '',
					huisnummer : '',
					gemeente : '',
					postcode : '',
					bus : ''
				},
				contactpersoon1 : {
					lastname : '',
					firstname : '',
					email : '',
					rijksregisternummer : '',
					geboortedatum : '',
					adres : {
						straat : '',
						huisnummer : '',
						gemeente : '',
						postcode : '',
						bus : ''
					},
					telefoonnummer : '',
					aansluitingsnr : '',
					betalend : false,
					ouder : false
				},
				contactpersoon2 : {
					lastname : '',
					firstname : '',
					email : '',
					rijksregisternummer : '',
					geboortedatum : '',
					adres : {
						straat : '',
						huisnummer : '',
						gemeente : '',
						postcode : '',
						bus : ''
					},
					telefoonnummer : '',
					aansluitingsnr : '',
					betalend : false,
					ouder : false
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

			$scope.$watch('profiel.contactpersoon1form', function (form) {
				if (form) {
					profiel.contactpersoon1form = form;
				}
			});

			$scope.$watch('profiel.contactpersoon2form', function (form) {
				if (form) {
					profiel.contactpersoon2form = form;
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
				} else if (profiel.contactpersoon1form && !profiel.contactpersoon1form.$pristine || profiel.contactpersoon2form && !profiel.contactpersoon2form.$pristine) {
					event.preventDefault();
					$mdDialog.show(confirm).then(function () {
						profiel.contactpersoon1form.$setPristine();
						profiel.contactpersoon2form.$setPristine();
						$state.go(toState.name)
					})
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
					profiel.user = response.data;
				})
				
				if(profiel.user.codegerechtigde){
					console.log(profiel.user)
					profiel.user.lid = true;
				}else{
					profiel.user.lid = false;
				}
			}

			profiel.opslaanGegevens = function () {
				profiel.edit = true;
				UserService.updateGegevens($rootScope.user.email, profiel.user).then(function (response) {
					getUser();
				})
			}

			profiel.opslaanAdres = function () {
				profiel.edit = true;
				UserService.updateAdres($rootScope.user.email, profiel.user.adres).then(function (response) {
					getUser();
				})
			}

			profiel.opslaanMutualiteit = function () {
				profiel.edit = true;
				UserService.updateMutualiteit($rootScope.user.email, profiel.user).then(function (response) {
					getUser();
				})
			}

			profiel.contactpersoon1Opslaan = function () {
				profiel.edit = true;
				UserService.updateContactpersoon($rootScope.user.email, profiel.user.contactpersoon1, 1).then(function (response) {
					getUser();
				})
			}

			profiel.contactpersoon2Opslaan = function () {
				profiel.edit = true;
				UserService.updateContactpersoon($rootScope.user.email, profiel.user.contactpersoon2, 2).then(function (response) {
					getUser();
				})
			}

			profiel.editData = function () {
				profiel.edit = false;
			}

		}
	]);
