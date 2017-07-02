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
  })(),

  renderHTMLElement: function(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  },

  emptyHTMLElement: function(el) {
    while (el.firstChild) { el.removeChild(el.firstChild); }
    return el;
  },

  removeHTMLElement: function(el) {
    if (el.parentNode != null) {
      el.parentNode.removeChild(el);
    }
  }

};
