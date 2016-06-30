'use strict';

describe('Controller: RegistreerCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var RegistreerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistreerCtrl = $controller('RegistreerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RegistreerCtrl.awesomeThings.length).toBe(3);
  });
});
