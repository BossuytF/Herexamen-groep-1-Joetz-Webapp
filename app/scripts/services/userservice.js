'use strict';

/**
 * @ngdoc service
 * @name webappApp.UserService
 * @description
 * # UserService
 * Service in the webappApp.
 */
angular.module('webappApp')
    .service('UserService', ['$http',
        function($http) {

            var service = {},
                baseUrl = 'http://37.139.13.237:8085/';

            function getAll() {
                return $http.get(baseUrl + 'user/');
            }

            function create(user) {
                return $http({
                    method: 'POST',
                    url: baseUrl + 'user',
                    data: {
                        email: user.email,
                        password: user.password,
                        firstname: user.voornaam,
                        lastname: user.naam,
                        username: user.username
                    }
                });
            }

            function get(email) {
                return $http.get(baseUrl + 'user/' + email);
            }

            function updateGegevens(email, user) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + 'user/' + email + '/profile',
                    data: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        geboortedatum: user.geboortedatum,
                        rijksregisternummer: user.rijksregisternummer
                    }
                });
            }

            function updateAdres(email, adres) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + 'user/' + email + '/adress',
                    data: {
                        straat: adres.straat,
                        huisnummer: adres.huisnummer,
                        postcode: adres.postcode,
                        gemeente: adres.gemeente,
                        bus: adres.bus
                    }
                });
            }

            function updateMutualiteit(email, user) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + 'user/' + email + '/details',
                    data: {
                        codegerechtigde: user.codegerechtigde
                    }
                });
            }

            function updateContactpersoon(email, contactpersoon, nr) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + 'user/' + email + '/contactpersoon' + nr,
                    data: {
                        firstname: contactpersoon.firstname,
                        lastname: contactpersoon.lastname,
                        email: contactpersoon.email,
                        telefoonnummer: contactpersoon.telefoonnummer,
                        rijksregisternummer: contactpersoon.rijksregisternummer,
                        aansluitnummer: contactpersoon.aansluitnummer,
                        betalend: contactpersoon.betalend,
                        ouder: contactpersoon.ouder,
                        straat: contactpersoon.adres.straat,
                        huisnummer: contactpersoon.adres.huisnummer,
                        gemeente: contactpersoon.adres.gemeente,
                        postcode: contactpersoon.adres.postcode,
                        bus: contactpersoon.adres.bus
                    }
                });
            }

            function updateRole(email, role) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + 'user/' + email + '/role',
                    data: {
                        role: role
                    }
                });
            }

            service.create = create;
            service.getAll = getAll;
            service.get = get;
            service.updateGegevens = updateGegevens;
            service.updateAdres = updateAdres;
            service.updateMutualiteit = updateMutualiteit;
            service.updateContactpersoon = updateContactpersoon;
            service.updateRole = updateRole;

            return service;
        }
    ]);