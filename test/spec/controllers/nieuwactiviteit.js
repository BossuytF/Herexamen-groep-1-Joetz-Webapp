'use strict';

describe('Controller: NieuwactiviteitCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var NieuwactiviteitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NieuwactiviteitCtrl = $controller('NieuwactiviteitCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NieuwactiviteitCtrl.awesomeThings.length).toBe(3);
  });
});
