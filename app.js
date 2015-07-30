var chalk = require('chalk');

var app = require('./lib/server')(1337);
console.log(chalk.blue('Server running on http://localhost:' + 1337));
