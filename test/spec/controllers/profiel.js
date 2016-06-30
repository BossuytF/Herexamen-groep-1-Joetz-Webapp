'use strict';

describe('Controller: ProfielCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var ProfielCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfielCtrl = $controller('ProfielCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfielCtrl.awesomeThings.length).toBe(3);
  });
});
