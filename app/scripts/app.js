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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/historiek', {
        templateUrl: 'views/historiek.html',
        controller: 'HistoriekCtrl',
        controllerAs: 'historiek'
      })
      .when('/kampen', {
        templateUrl: 'views/kampen.html',
        controller: 'KampenCtrl',
        controllerAs: 'kampen'
      })
      .when('/profiel', {
        templateUrl: 'views/profiel.html',
        controller: 'ProfielCtrl',
        controllerAs: 'profiel'
      })
      .when('/inschrijven', {
        templateUrl: 'views/inschrijven.html',
        controller: 'InschrijvenCtrl',
        controllerAs: 'inschrijven'
      })
      .when('/medewerkers', {
        templateUrl: 'views/medewerkers.html',
        controller: 'MedewerkersCtrl',
        controllerAs: 'medewerkers'
      })
      .when('/activiteiten', {
        templateUrl: 'views/activiteiten.html',
        controller: 'ActiviteitenCtrl',
        controllerAs: 'activiteiten'
      })
      .when('/nieuwActiviteit', {
        templateUrl: 'views/nieuwactiviteit.html',
        controller: 'NieuwactiviteitCtrl',
        controllerAs: 'nieuwActiviteit'
      })
      .when('/nieuwKamp', {
        templateUrl: 'views/nieuwkamp.html',
        controller: 'NieuwkampCtrl',
        controllerAs: 'nieuwKamp'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
