'use strict';

describe('Controller: ActiviteitenCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var ActiviteitenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActiviteitenCtrl = $controller('ActiviteitenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActiviteitenCtrl.awesomeThings.length).toBe(3);
  });
});
