var cp = require('child_process');

module.exports = function(url) {
        if (url.toLowerCase().slice(1) === "cal/" || url.toLowerCase().slice(1) === "cal") {return "node node-cal";}
        var argsStr = url.toLowerCase().slice(1);
        var args = argsStr[argsStr.length - 1] === "/" ?
                   argsStr.slice(0, argsStr.length - 1).split("/").slice(1):
                   argsStr.split("/").slice(1);
        if (parseInt(args[1]) < 13 && parseInt(args[1]) > 0 && args[0].length === 4) {
          args.unshift(args[1]);
          args.splice(2, 1);
        }
        return "node node-cal " + args.join(" ");
}
