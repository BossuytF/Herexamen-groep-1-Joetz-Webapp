'use strict';

describe('Service: activiteitenservice', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var activiteitenservice;
  beforeEach(inject(function (_activiteitenservice_) {
    activiteitenservice = _activiteitenservice_;
  }));

  it('should do something', function () {
    expect(!!activiteitenservice).toBe(true);
  });

});
