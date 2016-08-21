'use strict';

describe('Service: inschrijvingservice', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var inschrijvingservice;
  beforeEach(inject(function (_inschrijvingservice_) {
    inschrijvingservice = _inschrijvingservice_;
  }));

  it('should do something', function () {
    expect(!!inschrijvingservice).toBe(true);
  });

});
