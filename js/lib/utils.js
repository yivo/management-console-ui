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
  },

  listenTransitionEnd: function(el, callback) {
    var stylePropertyToEventName = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition   : 'transitionend',
      OTransition     : 'oTransitionEnd otransitionend',
      msTransition    : 'MSTransitionEnd',
      transition      : 'transitionend'
    };

    for (var styleProperty in stylePropertyToEventName) {
      if (el.style[styleProperty] != null) {

        function fn() {
          el.removeEventListener(stylePropertyToEventName[styleProperty], fn);
          callback();
        }

        el.addEventListener(stylePropertyToEventName[styleProperty], fn);
        break;
      }
    }
  },

  // 1. Trims leading and trailing whitespace.
  // 2. Collapses inner whitespace in one space.
  squish: function(str) {
    return str.replace(/\s+/g, ' ').replace(/(?:^\s+)|(?:\s+$)/g, '');
  },

  each: function(ary, fn, ctx) {
    for (var i = 0, l = ary.length; i < l; ++i) {
      fn.call(ctx, ary[i], i);
    }
  },

  // Returns a wrapper function that, when executed, checks how much
  // time passed since time wrapper created.
  //
  // timePassed = created at - now.
  // If timePassed < duration : creates a timer which invokes target function in duration - timePassed.
  // If timePassed >= duration: immediately invokes target function.
  emulateSmoothLoad: function(fn, duration) {
    var started = Date.now();

    return function() {
      var now = Date.now(), ctx = this;

      if (now - started <= duration) {
        var i = -1, args = [];
        while (++i < arguments.length) { args.push(arguments[i]) }
        setTimeout(function() { fn.apply(ctx, args) }, duration - (now - started));
      } else {
        fn.apply(ctx, arguments);
      }
    }
  },

  truncateString: function(str, max) {
    return str.length > max ? str.substr(0, max) + '...' : str;
  }

};
