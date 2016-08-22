'use strict';

describe('Service: kampenService', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var kampenService;
  beforeEach(inject(function (_kampenService_) {
    kampenService = _kampenService_;
  }));

  it('should do something', function () {
    expect(!!kampenService).toBe(true);
  });

});
