var codes = require ('http').STATUS_CODES;
var boom = require ('boom');

Object.keys(boom).forEach(function(k){
  module.exports[k] = function () {
    var arg = arguments;
    if (typeof arg[0].throw == 'function') {

      var err = boom[k](arg[1] || '');
      var ret = [ err.output.statusCode, arg[1] || codes[err.output.statusCode] ];
      arg[0].throw.apply(arg[0], ret);

    } else {
      var err = boom[k](arg[0]);
      return [ err.output.statusCode, arg[0] || codes[err.output.statusCode] ];
    }
  }
});

