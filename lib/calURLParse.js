var cp = require('child_process');

module.exports = function(url) {
        // if the entire url string (with initial slash removed) is "cal" or "cal/", execute cal w/o arguments.
        if (url.toLowerCase().slice(1) === "cal/" || url.toLowerCase().slice(1) === "cal") {return "./node-cal/node-cal.js";}
        // get rid of initial slash & put all characters in lowercase.
        var argsStr = url.toLowerCase().slice(1);
        // get rid of last slash if there is one, and get rid of initial "cal" argument from the array.
        var args = argsStr[argsStr.length - 1] === "/" ?
                   argsStr.slice(0, argsStr.length - 1).split("/").slice(1):
                   argsStr.split("/").slice(1);
        // parseInt
        var arg1 = +args[0];
        var arg2 = +args[1];
        // if there's only one argument and it didn't parse to int (is a string or who knows)
        // or if there's more than one & either the first or the second didn't parse to int,
        // return early such that the exec command will be undefined & we aren't vulnerable to malicious code.
        if ((isNaN(arg1) && args.length === 1) || (args.length !== 1 && (isNaN(arg1) || isNaN(arg2)))) {return}
        // if the second number is a month and first is a year, copy the month to the front and then delete the year from the back.
        // (such that the YY/MM becomes MM/YY)
        if (arg2 < 13 && arg2 > 0 && arg1.toString().length === 4) {
          args.unshift(arg2);
          args.splice(2, 1);
        }
        return "./node-cal/node-cal.js " + args.join(" ");
}
