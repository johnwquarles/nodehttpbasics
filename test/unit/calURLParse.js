var expect = require('chai').expect;
var path = require('path');
var parse = require(path.join(process.cwd(), '/lib/calURLParse'));

describe('calURLParse', function () {
  it('should handle the base /cal route', function () {
    expect(parse('/cal')).to.equal('node node-cal');
  });

  it('should handle a full year route', function () {
    expect(parse('/cal/2015')).to.equal('node node-cal 2015');
    expect(parse('/cal/9999999')).to.equal('node node-cal 9999999');
  });

  it('should handle a month first route', function () {
    expect(parse('/cal/1/2015')).to.equal('node node-cal 1 2015');
  });

  it('should handle a month last route', function () {
    expect(parse('/cal/2015/1')).to.equal('node node-cal 1 2015');
  });

  it('should handle invalue routes', function () {
    expect(parse('/cal/foo')).to.equal('node node-cal foo');
    expect(parse('/cal/foo/bar')).to.equal('node node-cal foo bar');
  });
});
