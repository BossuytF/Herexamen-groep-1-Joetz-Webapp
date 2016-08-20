'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
.module('webappApp', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'LocalStorageModule',
		'ui.router',
		'ngMaterial',
		'ngtweet',
		'ngMap'
	])
.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdDateLocaleProvider) {


	$mdDateLocaleProvider.formatDate = function (date) {
		return moment(date).format('DD/MM/YYYY');
	};

	$mdDateLocaleProvider.parseDate = function (dateString) {
		if (dateString == null || dateString.length == 0) {
			return null;
		}

		var m = moment(dateString, 'DD/MM/YYYY', true);
		return m.isValid() ? m.toDate() : new Date(NaN);
	};

	$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('home', {
		url : '/home',
		templateUrl : 'views/home.html',
		controller : 'HomeCtrl',
		controllerAs : 'home'
	})
	.state('detailblog', {
		url : '/blog/:blogId',
		templateUrl : 'views/blog.detail.html',
		controller : function (blogService, $stateParams, $scope) {
			blogService.get($stateParams.blogId).then(function (response) {
				$scope.blog = response.data;
			});
		}
	})
	.state('nieuwBlog', {
		url : '/nieuw/blog',
		templateUrl : 'views/blog.nieuw.html',
		controller : 'NieuwBlogCtrl',
		controllerAs: 'nieuwBlog'
	})
	.state('about', {
		url : '/about',
		templateUrl : 'views/about.html',
		controller : 'AboutCtrl',
		controllerAs : 'about'
	})
	.state('login', {
		url : '/login',
		templateUrl : 'views/login.html',
		controller : 'LoginCtrl',
		controllerAs : 'login'
	})
	.state('historiek', {
		url : '/historiek',
		templateUrl : 'views/historiek.html',
		controller : 'HistoriekCtrl',
		controllerAs : 'historiek'
	})
	.state('kampen', {
		url : '/kampen',
		templateUrl : 'views/kampen/kampen.html',
		controller : 'KampenCtrl',
		controllerAs : 'kampen'
	})
	.state('kampdetail', {
		url : '/kamp/:kampId/detail',
		templateUrl : 'views/kampen/kamp.detail.html',
		controller : 'DetailKampCtrl',
		controllerAs : 'detailkamp'
	})
	.state('nieuwKamp', {
		url : '/kamp/nieuw',
		templateUrl : 'views/kampen/kamp.nieuw.html',
		controller : 'NieuwkampCtrl',
		controllerAs : 'nieuwKamp',
	})
	.state('editKamp', {
		url : '/kamp/:kampId/edit',
		templateUrl : 'views/kampen/kamp.nieuw.html',
		controller : 'NieuwkampCtrl',
		controllerAs : 'nieuwKamp'
	})
	.state('profiel', {
		url : '/profiel',
		templateUrl : 'views/profiel/profiel.html',
		controller : 'ProfielCtrl',
		controllerAs : 'profiel'
	})
	.state('profiel.deelnemer', {
		url : '/deelnemer',
		templateUrl : 'views/profiel/profiel.deelnemer.html',
		controller : 'ProfielCtrl',
		controllerAs : 'profiel'
	})
	.state('profiel.ouders', {
		url : '/ouders',
		templateUrl : 'views/profiel/profiel.ouders.html',
		controller : 'ProfielCtrl',
		controllerAs : 'profiel'
	})
	.state('profiel.contactpersoon', {
		url : '/contactpersoon',
		templateUrl : 'views/profiel/profiel.contactpersoon.html',
		controller : 'ProfielCtrl',
		controllerAs : 'profiel'
	})
	.state('profiel.extrainfo', {
		url : '/extrainfo',
		templateUrl : 'views/profiel.extrainfo.html',
		controller : 'ProfielCtrl',
		controllerAs : 'profiel'
	})
	.state('profiel.wachtwoord', {
		url : '/wachtwoord',
		templateUrl : 'views/profiel/profiel.wachtwoord.html',
		controller : 'ProfielCtrl',
		controllerAs : 'profiel'
	})
	.state('inschrijven', {
		url : '/inschrijven',
		templateUrl : 'views/inschrijven.html',
		controller : 'InschrijvenCtrl',
		controllerAs : 'inschrijven'
	})
	.state('medewerkerstoewijzen', {
		url : '/medewerkers/toewijzen',
		templateUrl : 'views/medewerker.toewijzen.html',
		controller : 'MedewerkersCtrl',
		controllerAs : 'medewerkers'
	})
	.state('medewerkers', {
		url : '/medewerkers',
		templateUrl : 'views/medewerkers.html',
		controller : 'MedewerkersCtrl',
		controllerAs : 'medewerkers'
	})
	.state('activiteiten', {
		url : '/activiteiten',
		templateUrl : 'views/activiteiten/activiteiten.html',
		controller : 'ActiviteitenCtrl',
		controllerAs : 'activiteiten'
	})
	.state('activiteitendetail', {
		url : '/activiteit/:activiteitId/detail',
		templateUrl : 'views/activiteiten/activiteit.detail.html',
		controller : 'ActiviteitenDetailCtrl',
		controllerAs : 'activiteiten',
	})
	.state('nieuwActiviteit', {
		url : '/nieuwActiviteit',
		templateUrl : 'views/activiteiten/activiteit.nieuw.html',
		controller : 'NieuwactiviteitCtrl',
		controllerAs : 'nieuwActiviteit'
	})
	.state('editActiviteit', {
		url : '/activiteit/:activiteitId/edit',
		templateUrl : 'views/activiteiten/activiteit.nieuw.html',
		controller : 'NieuwactiviteitCtrl',
		controllerAs : 'nieuwActiviteit'
	})
	.state('registreer', {
		url : '/registreer',
		templateUrl : 'views/registreer.html',
		controller : 'RegistreerCtrl',
		controllerAs : 'registreer'
	})
	.state('vergeten', {
		url : '/vergeten',
		templateUrl : 'views/vergeten.html',
		controller : 'VergetenCtrl',
		controllerAs : 'vergeten'
	});
});
