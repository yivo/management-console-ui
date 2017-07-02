(function() {
  function FlashesManager(outlet) {
    this.outlet = outlet;
  }

  // Shows flash.
  FlashesManager.prototype.show = function(flash, options) {
    if (options == null) { options = {}; }

    // Get rid of existing flashes.
    app.utils.emptyHTMLElement(this.outlet);

    // Render flash.
    flash.el = app.utils.renderHTMLElement(app.templates.flash(flash));

    // Put in DOM.
    this.outlet.appendChild(flash.el);

    // Perform transition.
    flash.el.classList.remove('hide');
    flash.el.offsetHeight;
    flash.el.classList.add('-appear');

    // Schedule removal.
    setTimeout(this._hide.bind(this, flash.el), options.duration == null ? 2000 : options.duration);

    return this;
  };

  // Hides active flash.
  FlashesManager.prototype.hide = function() {
    [].slice.call(this.outlet.children).forEach(this._hide.bind(this));
    return this;
  };

  FlashesManager.prototype._hide = function(flashEl) {
    flashEl.classList.remove('-appear');

    app.utils.listenTransitionEnd(flashEl, function() {
      app.utils.removeHTMLElement(flashEl);
    });
  };

  app.on('dom-ready', function() {
    app.flashesManager = new FlashesManager(document.getElementById('console-flash-outlet'));
  });
})();
