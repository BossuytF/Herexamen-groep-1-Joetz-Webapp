'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
    .controller('AdminCtrl', ['$scope', '$rootScope', '$state', 'UserService', 'InschrijvingService', 'KampenService',
        function($scope, $rootScope, $state, UserService, InschrijvingService, KampenService) {

            $scope.selectedUser = 'none';
            $scope.selectedRole = 'none';
            $scope.selectedEmail = 'none';

            // Fetch all users
            // Sort by email ascending
            $scope.users = UserService.getAll().then(function(response) {
                $scope.users = response.data;
                $scope.users.sort(function(a, b) {
                    return a.email.localeCompare(b.email);
                });
            })

            // Select user
            $scope.selectUser = function(user) {
                $scope.selectedUser = user;
                this.selectedEmail = user.email;
                this.selectedRole = user.role;
                console.log("Bewerk gebruiker");
            };

            // Update a user
            $scope.updateUser = function(user) {
                $scope.selectedUser.email = this.selectedEmail;
                $scope.selectedUser.role = this.selectedRole;
                UserService.updateRole($scope.selectedUser.email, $scope.selectedUser.role);
                $scope.selectedUser = 'none';
                console.log("Sla bewerkte gebruiker op");
            };

            // Inschrijvingen

            $scope.selectedInschrijving = 'none';
            $scope.selectedBetaald = 'none';
            $scope.selectedGoedgekeurd = 'none';
            var temp;
            var temp2;

            // Fetch all inschrijvingen
            // Sort by kamp ascending
            $scope.inschrijvingen = InschrijvingService.getAll().then(function(response) {
                $scope.inschrijvingen = response.data;
                // Get inschrijving userid
                for (var i = $scope.inschrijvingen.length - 1; i >= 0; i--) {
                    $scope.inschrijvingen[i].email = $scope.inschrijvingen[i].user;
                }
                // Get inschrijving kampid
                for (var i = $scope.inschrijvingen.length - 1; i >= 0; i--) {
                    $scope.inschrijvingen[i].kamp = $scope.inschrijvingen[i].kamp;
                }
                KampenService.getAll().then(function(response) {
                    temp = response.data;
                    for (var i = $scope.inschrijvingen.length - 1; i >= 0; i--) {
                        for (var j = temp.length - 1; j >= 0; j--) {
                            if ($scope.inschrijvingen[i].kamp === temp[j].id) {
                                $scope.inschrijvingen[i].kamp = temp[j].naam;
                            }
                        }
                    }
                });
                UserService.getAll().then(function(response) {
                    temp2 = response.data;
                    for (var i = $scope.inschrijvingen.length - 1; i >= 0; i--) {
                        for (var j = temp2.length - 1; j >= 0; j--) {
                            if ($scope.inschrijvingen[i].email === temp2[j].id) {
                                $scope.inschrijvingen[i].email = temp2[j].email;
                            }
                        }
                    }
                });
            })

            // Select user
            $scope.selectInschrijving = function(inschrijving) {
                $scope.selectedInschrijving = inschrijving;
                this.selectedGoedgekeurd = inschrijving.goedgekeurd;
                this.selectedBetaald = inschrijving.betaald;
                console.log("Bewerk inschrijving");
            };

            // Update a Inschrijving
            $scope.updateInschrijving = function(inschrijving) {
                $scope.selectedInschrijving.goedgekeurd = this.selectedGoedgekeurd;
                $scope.selectedInschrijving.betaald = this.selectedBetaald;
                InschrijvingService.update($scope.selectedInschrijving);
                $scope.selectedInschrijving = 'none';
                console.log("Sla bewerkte inschrijving op");
            };
        }
    ]);