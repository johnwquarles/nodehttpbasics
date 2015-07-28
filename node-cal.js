#!/usr/bin/env node

var args = process.argv.slice(2);
var cal = require('./lib/makecal');

cal.makeCal(args);
