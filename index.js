var codes = require ('http').STATUS_CODES;
var boom = require ('boom');

module.exports = function (transform) {

  if (transform) {
    if (typeof transform != 'function') {
      throw TypeError ('typeof transform != \'function\'');
    }  
  }
  
  var handle = {};
  transform = transform || function(o){ return o; };

  Object.keys(boom).forEach(function(k){

    handle[k] = function () {
      
      var arg = arguments;
      
      if (arg[0] && typeof arg[0].throw == 'function') {
        
        var err = boom[k](arg[1] || '');
        var ret = [ err.output.statusCode, transform(arg[1] || codes[err.output.statusCode]) ];
        arg[0].throw.apply(arg[0], ret);

      } else {

        var err = boom[k](arg[0] || '');
        return [ err.output.statusCode, transform(arg[0] || codes[err.output.statusCode]) ];
      }
    }
  
  });

  return handle;
}


