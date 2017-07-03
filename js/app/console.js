(function() {
  app.on('dom-ready', function() {
    app.console = new Console( document.getElementById('console-grid-outlet') ).load();
  });

  function Console(outlet) {
    this.outlet        = outlet;
    this.loadsCount    = 0;
    this.onLoadSuccess = this.onLoadSuccess.bind(this);
    this.onLoadFailure = this.onLoadFailure.bind(this);
  }

  Console.prototype.load = function() {
    if (this.xhr != null) {
      this.xhr.abort();
      this.xhr = null;
    }

    app.notify('will-load-console', this);

    this.clearGrid();

    this.xhr = app.utils.ajax('GET', 'http://management-console-api-mock.site/clients/1/buttons', {
      success: app.utils.emulateSmoothLoad(this.onLoadSuccess, 1000),
      failure: app.utils.emulateSmoothLoad(this.onLoadFailure, 1000)
    });

    return this;
  };

  Console.prototype.onLoadSuccess = function(request) {
    ++this.loadsCount;

    app.utils.each(request.responseJSON.buttons, function(button) {
      button.title = app.utils.squish(button.title);
    });

    app.notify('did-load-console', this, request);
    this.renderGrid(request.responseJSON);
  };

  Console.prototype.onLoadFailure = function(request) {
    if (!request.aborted) {
      app.notify('did-fail-load-console', this, request);
    }
  };

  Console.prototype.renderGrid = function(data) {
    this.clearGrid();

    if (data.buttons.length > 0) {

      var grid = app.utils.renderHTMLElement(app.templates.grid(data));

      app.utils.emptyHTMLElement(this.outlet);

      this.outlet.appendChild(grid);

      grid.offsetHeight;

      grid.classList.add('-appear');
    }
  };

  Console.prototype.clearGrid = function() {
    app.utils.emptyHTMLElement(this.outlet);
  };
})();
