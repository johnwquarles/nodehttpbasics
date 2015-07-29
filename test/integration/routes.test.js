// chai will either export a function that manipulates all the primitives to respond to its
// syntax, or an object or something.
// in any case you can get at its functionality by doing .should(), .expect or .assert after
// require('chai').
var expect = require('chai').expect;
var http = require('http');
var path = require('path');
var port = Math.floor(Math.random() * 50000);
var url = 'http://localhost:' + port;

describe('Routes', function() {
  // this is making an API call to other services (starwars, weather); isn't strictly
  // between our computer's server and browser.
  // hence we need to make this time allowance.
  this.timeout(30000);

  // var port = Math.floor(Math.random() * 50000);
  // var url = 'http://localhost:' + port;

  before(function() {
    // this is preferable to using childprocess; we don't need to use it
    // since the server doesn't take arguments.
    // and I guess that require will run a module's code even if it isn't exporting anything.
    require(path.join(process.cwd(), '/lib/server'))(port);
  });

  // always pass done on an async!
  // done is different for each test and is created contextually, like "this",
  // so you need to pass in and run a different 'done' for each test as
  // determined by 'it' clauses.
  // ie, there is no better way than the below (passing in done each time)
  // that I know of currently.
  it('should respond to the /weather route', function (done) {
    routeTest(done, '/weather', 200, 'temperature');
  });

  it('should respond to the /starwarsmovies route', function (done) {
    routeTest(done, '/starwarsmovies', 200, 'Hope');
  });

  it('should respond to the /cal route', function (done) {
    var d = new Date();
    routeTest(done, '/cal', 200, d.getMonth());
  });

  it('should throw 403 at an /arbitrary route', function (done) {
    routeTest(done, '/arbitrary', 403);
  });

});

function routeTest(done, route, expectCode, expectContain) {
  http.get(url + route, function(res) {
    var body = '';
    expect(res.statusCode).to.equal(expectCode);
    res
      .on('data', function(chunk) {
        body += chunk;
      })
      .on('end', function() {
        expectContain && expect(body).to.contain(expectContain);
        done();
      });
  })
}
