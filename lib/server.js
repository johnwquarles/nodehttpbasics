// sure enough can't unit test unless we were to put this into a module.
// So we're gonna do integration tests.

// can write to res as you wish, then call res.end(). Can write to it during the end
// command too with res.end("blah").

var http = require('http');
var https = require('https');
var chalk = require('chalk');
var cp = require('child_process');
var path = require('path');
var parse = require(path.join(process.cwd(), "/lib/calURLParse"));
var log = require(path.join(process.cwd(), "/lib/scottlog"));
var request = require('request');
var cheerio = require('cheerio');

module.exports = function (port) {
  http.createServer(function(req, res) {
    if (req.method === 'GET' && req.url.toLowerCase() === '/weather') {
      // can do res.writeHead to just write the code.
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
          request.get('http://swapi.co/api/films/', function (err, xhr, body) {
            var data = JSON.parse(body);
            data.results.forEach(function(r) {
              res.write(r.title + '\n');
            });
            res.end();
          });
        // http.get('http://swapi.co/api/films/')
        //   .on('response', function(xhr) {
        //     var body = '';
        //     xhr
        //       .on('data', function (chunk) {
        //         body += chunk;
        //       })
        //       .on('end', function () {
        //         var data = JSON.parse(body)

        //         var titles = data.results.map(function(r) {
        //           return r.title;
        //         });

        //         res.write(JSON.stringify({titles: titles}));
        //         res.end();
        //       });
        //   })
      } else if (req.url.toLowerCase().slice(1, 4) === "cal") {
        res.writeHeader(200, {
          // if you want the API to only be usable by your
          // own site, wouldn't want to allow any server
          // to access it as is being enabled below.
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        });

        var command = parse(req.url);

        // async version:
        // ------------------
        // cp.execFile('./node-cal.js', args, function(err, output) {
        //   res.write(output);
        //   res.end();
        // })
        // ------------------
        // sync version of execFile:
        // ------------------
        // var output = cp.execFileSync('./node-cal.js', args);
        // ------------------
        // but I gotta go with cp.exec due to how Scott wrote the unit testing exercise.
        var output = cp.execSync(command);
        res.write(output);
        res.end();
      } else if (req.method === 'GET' && req.url === '/news') {
        //never gonna give you up
        request.get('http://reddit.com', function (err, xhr, body) {
          $ = cheerio.load(body);
          $('a').attr('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
          res.end($.html());
        });
      }
       else if (req.method === 'GET' && req.url === '/topnews') {
        request.get('http://reddit.com', function(err, xhr, body) {
          // parent has id of siteTable, child is 'a' with class of title.
          res.end(cheerio(body).find('#siteTable a.title').first().text());
        });
      }
      else{
        res.writeHead(403);
        res.end('Access Denied!');
      }

      //res.on('close', function(req){console.log('ok'); logreq(req);})
      console.log(log(req, res));
  }).listen(port);
}
