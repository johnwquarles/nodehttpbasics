var makeMonth = require('./writeMonth');

var export_obj = {};

export_obj.writeYear = function(year) {
  var year = parseInt(year);
  makeMonth.Y = true;
  for (var i = 1; i < 13; i++) {
    makeMonth.writeMonth(i, year);
  }
  console.log(yearHeader());

// j: "for the first three months", "for the next three months", etc.
// i: go through all buckets and print; pattern is: 1st line of 1st month + 1st of 2nd + 1st of 3rd,
// 2nd line of 1st month, 2nd line of 2nd, 2nd line of 3rd, etc. until all lines for first three months are printed.
// Then j increments up by 3 so that we write all lines for the 4th month, 5th and 6th.
// continue until finally j = 9 (which corresponds to the 10th month; unintuitive, but arrays are 0-indexed
// and j needs to be the arrays' index) and we'll print off 9, 10 and 11 (Oct., Nov. and Dec.) and we're done.
  for (var j = 0; j <= 9; j+=3) {
    for (var i = 0; i < makeMonth.buckets.length; i++) {
      console.log(makeMonth.buckets[i][j] + " " + makeMonth.buckets[i][j+1] + " " + makeMonth.buckets[i][j+2]);
    }
  }

  function yearHeader(){
    var spaces_num = Math.floor((64 - year.toString().length) / 2);
    var spaces = "";
    for (var i = 0; i < spaces_num - 1; i++) {
      spaces += " ";
    }
    return spaces + year + "\n";
  }
}

module.exports = export_obj;
