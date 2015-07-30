var chalk = require('chalk');

module.exports = function(req, res) {
  var color = res.statusCode !== 200 ? chalk.red: chalk.cyan;
  var date = (new Date()).toUTCString();
  return '[' + date + '] "' + color(req.method) + " " + color(req.url) + '" "' + req.headers["user-agent"] + '"';
}
