var expect = require('chai').expect;
var path = require('path');
var parse = require(path.join(process.cwd(), '/lib/calURLParse'));
var calpath = "node_modules/node-cal/node-cal.js";

describe('calURLParse', function () {
  it('should handle the base /cal route', function () {
    expect(parse('/cal')).to.equal(calpath);
  });

  it('should handle a full year route', function () {
    expect(parse('/cal/2015')).to.equal(calpath + " 2015");
    expect(parse('/cal/9999999')).to.equal(calpath + " 9999999");
  });

  it('should handle a month first route', function () {
    expect(parse('/cal/1/2015')).to.equal(calpath + " 1 2015");
  });

  it('should handle a month last route', function () {
    expect(parse('/cal/2015/1')).to.equal(calpath + " 1 2015");
  });

  it('should handle invalid routes', function () {
    expect(parse('/cal/foo')).to.equal(undefined);
    expect(parse('/cal/foo/bar')).to.equal(undefined);
    expect(parse('/cal/foo/2015')).to.equal(undefined);
    expect(parse('/cal/2015/bar')).to.equal(undefined);
  });
});
