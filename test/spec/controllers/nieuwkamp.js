'use strict';

describe('Controller: NieuwkampCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var NieuwkampCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NieuwkampCtrl = $controller('NieuwkampCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NieuwkampCtrl.awesomeThings.length).toBe(3);
  });
});
