'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
    .controller('AdminCtrl', ['$scope', '$rootScope', '$state', 'UserService',
        function($scope, $rootScope, $state, UserService) {

            console.log('ADMIN CONTROLLER GELADEN');
            if ($rootScope.user.role === 'beheerder') {
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }

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
        }
    ]);