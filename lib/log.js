var chalk = require('chalk');

module.exports = function(req, res, colorflag) {s
  var now = new Date;
  var color = res.statusCode !== 200 ? chalk.red: chalk.green;
  if (colorflag) {
    process.stdout.write("[" + chalk.blue(now.toTimeString()) + "] ");
    process.stdout.write('"' + color(req.method + " " + req.url) + '" ');
    process.stdout.write('"' + chalk.white(req.headers["user-agent"]) + '"\n')
    //console.log(res.statusCode);
  } else {
    process.stdout.write("[" + now.toTimeString() + "] ");
    process.stdout.write('"' + req.method + " " + req.url + '" ');
    process.stdout.write('"' + req.headers["user-agent"] + '"\n')
  }

}
