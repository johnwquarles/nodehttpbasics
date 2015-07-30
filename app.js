var chalk = require('chalk');
var port = process.env.PORT || 1337;

var app = require('./lib/server')(port);
console.log(chalk.blue('Server running on http://localhost:' + 1337));
