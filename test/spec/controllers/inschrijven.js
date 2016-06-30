'use strict';

describe('Controller: InschrijvenCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var InschrijvenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InschrijvenCtrl = $controller('InschrijvenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InschrijvenCtrl.awesomeThings.length).toBe(3);
  });
});
