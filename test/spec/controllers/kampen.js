'use strict';

describe('Controller: KampenCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var KampenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KampenCtrl = $controller('KampenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KampenCtrl.awesomeThings.length).toBe(3);
  });
});
