var zeller = require('./zeller');

var export_obj = {};
var j = 1;
var monthIs;
var yearIs;
var numDays;
var firstIs;

// Y is a flag that the writeMonth function will check; if it's false (default),
// that means that it's going to write its output directly into the terminal window
// via console logs. If it's true, it will dump its output into the buckets array
// (below). The idea is that writeYear will run writeMonth 12 times, so that
// we wind up with the first bucket full of all the first lines of each month,
// second bucket with all of the second lines, etc. We then do some looping in makeYear
// to put those lines together via concatenation to make the lines we print for the year's
// calendar (three months per row until they're done, then the next three, etc.)
export_obj.Y = false;
// buckets is outside of the scope of writeMonth and module is a singleton,
// so buckets will all get filled up when running writeMonth 12 times (as desired);
// writeYear is able to use them by accessing the buckets attribute of
// this single (and inherently only) instantiation
// of the singleton writeMonth module.
export_obj.buckets = [[],[],[],[],[],[],[],[]];

var month_name = {1: "January", 2: "February", 3: "March",
                  4: "April",   5: "May",      6: "June",
                  7: "July",    8: "August",   9: "September",
                 10: "October",11: "November",12: "December"};

var days_in_month = {1: 31,  2: 28,  3: 31,  4: 30,  5: 31,  6: 30,
                     7: 31,  8: 31,  9: 30, 10: 31, 11: 30, 12: 31};

export_obj.numDays = function(month, year){
  return (month === 2 && this.isLeap(year)) ? 29 : days_in_month[month];
}

export_obj.isLeap = function(year) {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {return true;}
  return false;
}

export_obj.writeMonth = function(month, year){
  j = 1;
  monthIs = parseInt(month);
  yearIs = parseInt(year);
  numDays = this.numDays(month, year);
  // let's get the first day into format: 0 is Sun, 1 is Mon, 6 is Sat.
  firstIs = (zeller.calculate(month, 1, year) + 6) % 7;
  if(!this.Y) {
    console.log(this.makeHeader());
    console.log("Su Mo Tu We Th Fr Sa");
    console.log(this.makeFirstLine());
    for (var i = 0; i < 5; i++) {
      console.log(this.makeOtherLine());
    }
  } else {
    this.buckets[0].push(this.makeHeader());
    monthIs % 3 !== 0 ? this.buckets[1].push("Su Mo Tu We Th Fr Sa "): this.buckets[1].push("Su Mo Tu We Th Fr Sa");
    this.buckets[2].push(this.makeFirstLine());
    for (var i = 3; i < 8; i++) {
      this.buckets[i].push(this.makeOtherLine());
    }
  }
  return "worked";
}

export_obj.makeHeader = function() {
  var line = "";
  var spaces = "";
  var monthTitle = month_name[monthIs];
  var content = monthTitle;
  if (!this.Y) {content = content + " " + yearIs;}
  var spaces_num = Math.floor((20 - content.length) / 2);
  for (var i = 0; i < spaces_num; i++) {
    spaces += " ";
  }

  // need to make sure that there aren't any trailing spaces if
  // this is going to be a line build for a single month instead of a year
  // also edge months (March, June, etc.) need to have no trailing spaces.
  if (this.Y && (monthIs % 3 !== 0)) {
    line = spaces + content + spaces;
    for (var i = 0; i < (20 - line.length) + 2; i++) {
      line += " ";
    }
  } else {
    line = spaces + content;
  }

  return line;
}

export_obj.makeFirstLine = function() {
  var line = "";
  for (var i = 0; i < firstIs; i++) {
    line += "   ";
  }
  for (var i = firstIs; i <= 6; i++) {
    if (i.toString().length === 1) {line += " ";}
    line += j
    // if there are days yet to write to the month, and we're only writing a month and we aren't on the last day of the row, add a space.
    // or, if we're writing a year and we aren't on an edge month (March, June, etc.) OR we are on an edge month but aren't on its last column, add a space.
    if (j < numDays && ((!this.Y && i !== 6) || this.Y && (monthIs % 3 !== 0 || i !== 6))) {line += " ";}
    j++;
  }
  return line;
}

export_obj.makeOtherLine = function() {
  var line = "";
  for (var i = 0; i <= 6; i++) {
    if (j <= numDays && j.toString().length === 1) {
      line += " " + j;
    } else if (j <= numDays) {
      line += j;
    } else if (this.Y && monthIs % 3 !== 0) {
      line += "  ";
    }
    // if we're writing just a month, we have days left to write and we aren't on the last column, add a space.
    // Or if we're writing a year, and either we aren't on an edge month (March, June, etc.) or we have days left to write & we aren't
    // on the last column, add a space.
    if ((!this.Y && j < numDays && i !== 6) || this.Y && (monthIs % 3 !== 0 || (i !== 6 && j < numDays))) {line += " ";}
    j++
  }
  return line;
}

module.exports = export_obj;
