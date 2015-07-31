var expect = require('chai').expect;
var path = require('path');
var log = require(path.join(process.cwd(), '/lib/scottlog'));

describe('log', function () {
  it('should create the log', function () {
    var date = (new Date()).toUTCString();
    var req1 = {
      method: 'GET',
      url: '/this/is/a/path.png',
      headers: {
        'user-agent': 'Lynx/2.8.8rel.2 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/1.0.2d'
      }
    };

    var req2 = {
      method: 'POST',
      url: '/my/form',
      headers: {
        'user-agent': 'curl/7.43.0'
      }
    };

    var res_stub = {statusCode: 200};

    var goal1 = '[' + date + '] "\u001b[36mGET\u001b[39m \u001b[36m/this/is/a/path.png\u001b[39m" "Lynx/2.8.8rel.2 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/1.0.2d"';
    var goal2 = '[' + date + '] "\u001b[36mPOST\u001b[39m \u001b[36m/my/form\u001b[39m" "curl/7.43.0"';
    expect(log(req1, res_stub)).to.equal(goal1);
    expect(log(req2, res_stub)).to.equal(goal2);


  });
});
