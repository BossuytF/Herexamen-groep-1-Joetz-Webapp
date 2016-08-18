'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:KampenCtrl
 * @description
 * # KampenCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
.controller('KampenCtrl', ['KampenService', '$mdToast', '$mdDialog', function (KampenService, $mdToast, $mdDialog) {
			var kampen = this;

			kampen.kampenLijst = [];

			function getKampen() {
				KampenService.getAll().then(function (response) {
					kampen.kampenLijst = response.data;
				});
			}
			getKampen();

			function deleteKamp(id) {
				$mdDialog.show(confirm).then(function () {
					KampenService.delete (id).then(function () {
						$mdToast.show(
							$mdToast.simple()
							.textContent('Kamp werd succesvol verwijderd')
							.position('start')
							.capsule(true));
					});
				});
			}

			var confirm = $mdDialog.confirm()
				.title('Pas op!')
				.textContent('Wenst u dit kamp te verwijderen')
				.ariaLabel('Pas op')
				.targetEvent()
				.ok('Ja')
				.cancel('Nee');
				
				
			function medewerkerToewijzen(id){
				$mdDialog.show(toewijzen).then(function(){
					KampenService.updateMedewerkers(id).then(function(response){
						console.log(response)
					})
				})
			}
			
			var toewijzen = {
				clickOutsideToClose: false,
                  scope: $scope,        
                  preserveScope: true,           
                  template:   "<md-content class="md-padding autocomplete" layout="column">
    <md-contact-chips
        ng-model="ctrl.contacts"
        md-contacts="ctrl.querySearch($query)"
        md-contact-name="name"
        md-contact-image="image"
        md-contact-email="email"
        md-require-match="true"
        md-highlight-flags="i"
        filter-selected="ctrl.filterSelected"
        placeholder="To">
    </md-contact-chips>
    <md-list class="fixedRows">
      <md-subheader class="md-no-sticky">Contacts</md-subheader>
      <md-list-item class="md-2-line contact-item" ng-repeat="(index, contact) in ctrl.allContacts"
          ng-if="ctrl.contacts.indexOf(contact) < 0">
        <img ng-src="{{contact.image}}" class="md-avatar" alt="{{contact.name}}" />
        <div class="md-list-item-text compact">
          <h3>{{contact.name}}</h3>
          <p>{{contact.email}}</p>
        </div>
      </md-list-item>
      <md-list-item class="md-2-line contact-item selected" ng-repeat="(index, contact) in ctrl.contacts">
        <img ng-src="{{contact.image}}" class="md-avatar" alt="{{contact.name}}" />
        <div class="md-list-item-text compact">
          <h3>{{contact.name}}</h3>
          <p>{{contact.email}}</p>
        </div>
      </md-list-item>
    </md-list>" ,
                  controller: function DialogController($scope, $mdDialog) {
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               }

			kampen.deleteKamp = deleteKamp;
		}
	]);
