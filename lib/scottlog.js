var chalk = require('chalk');

module.exports = function(req, res, colorflag) {
  var color = res.statusCode !== 200 ? chalk.red: chalk.cyan;
  var date = (new Date()).toUTCString();
  if (colorflag) {
    return '[' + date + '] "' + color(req.method) + " " + color(req.url) + '" "' + req.headers["user-agent"] + '"';
  } else {
    return '[' + date + '] "' + req.method + " " + req.url + '" "' + req.headers["user-agent"] + '"';
  }
}
