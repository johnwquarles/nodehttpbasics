var http = require('http');
var https = require('https');
var cp = require('child_process');

http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url.toLowerCase() === '/weather') {
    console.log(req.url);
    console.log(req.url.toLowerCase());
    res.writeHeader(200, {
      // if you want the API to only be usable by your
      // own site, wouldn't want to allow any server
      // to access it as is being enabled below.
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    https.get('https://api.forecast.io/forecast/ffbc590ea0ec39febe985c888e0a889c/36.1658,-86.7777')
      .on('response', function (xhr) {
        xhr.pipe(res);
        // xhr
        //   .on('data', function (chunk) {
        //     res.write(chunk);
        //   })
        //   .on('end', function () {
        //       res.end();
        //   });
    });
    } else if (req.method === 'GET' && req.url.toLowerCase() === '/starwarsmovies') {
      http.get('http://swapi.co/api/films/')
        .on('response', function(xhr) {
          var body = '';
          xhr
            .on('data', function (chunk) {
              body += chunk;
            })
            .on('end', function () {
              var data = JSON.parse(body)

              var titles = data.results.map(function(r) {
                return r.title;
              });

              res.write(JSON.stringify({titles: titles}));
              res.end();
            });
        })
    } else if (req.url.toLowerCase().slice(1).split("/")[0] === "cal") {

      res.writeHeader(200, {
        // if you want the API to only be usable by your
        // own site, wouldn't want to allow any server
        // to access it as is being enabled below.
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      });

      var argsStr = req.url.toLowerCase().slice(1);
      var args = argsStr[argsStr.length - 1] === "/" ?
                 argsStr.slice(0, argsStr.length - 1).split("/").slice(1):
                 argsStr.split("/").slice(1);
      console.log(args);
      // async version:
      // ------------------
      // cp.execFile('./node-cal.js', args, function(err, output) {
      //   res.write(output);
      //   res.end();
      // })
      var output = cp.execFileSync('./node-cal.js', args);
      res.write(output);
      res.end();
    }
    else{
      res.writeHead(403);
      res.end('Access Denied!');
    }

}).listen(1338);

console.log('Server running on http://localhost:1338');
