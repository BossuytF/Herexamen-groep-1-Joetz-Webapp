'use strict';

describe('Controller: MedewerkersCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var MedewerkersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MedewerkersCtrl = $controller('MedewerkersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MedewerkersCtrl.awesomeThings.length).toBe(3);
  });
});
