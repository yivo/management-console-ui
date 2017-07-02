app.utils = {

  escapeHTML: (function() {
    var rules = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    };

    function replacement(c) { return rules[c] != null ? rules[c] : c }

    return function(html) {
      return (typeof html === 'string' ? html : html + '').replace(/[&<>"]/g, replacement)
    }
  })()

};
