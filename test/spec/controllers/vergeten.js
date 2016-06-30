'use strict';

describe('Controller: VergetenCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var VergetenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VergetenCtrl = $controller('VergetenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VergetenCtrl.awesomeThings.length).toBe(3);
  });
});
