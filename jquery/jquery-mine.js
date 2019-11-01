(function(global, factory) {
  'use strict'
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ?
      factory(global, true) :
      function(w) {
        if (!w.document) {
          return new Error("jQuery requires a window with a document");
        }
        return factory(w)
      }
  } else {
    factory(global)
  }

})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  'use strict'

  var version = '0.0.1'
  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context)
  }

  jQuery.fn = jQuery.prototype = {
    
  }

})