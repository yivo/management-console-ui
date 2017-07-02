app.utils.ajax = (function() {
  function send(xhr, options) {
    var data, dataType;

    if (options.data != null) {

      // If given data is JS object and no data type given -> automatically set content type to JSON.
      if (options.dataType == null && typeof options.data === 'object') {
        data     = JSON.stringify(options.data);
        dataType = 'application/json; charset=UTF-8';
      } else {
        data     = options.data;
        dataType = options.dataType;
      }

      xhr.setRequestHeader('Content-Type', dataType);
    }

    app.notify('will-ajax', xhr, options);

    if (options.data != null) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  function parseJSON(response) {
    var responseJSON = null;
    try { responseJSON = JSON.parse(response) } catch (e) {}
    return responseJSON;
  }

  function runHook(options, name, args) {
    if (options[name] != null) {
      options[name].apply(null, args);
    }
  }

  return function(method, url, options) {
    if (options == null) { options = {}; }

    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onload = function() {
      var responseJSON = parseJSON(this.response);
      var result = this.status >= 200 && this.status < 400 ? 'success' : 'failure';
      runHook(options, result, [this, this.status, responseJSON]);
      app.notify('did-ajax', result, this, this.status, responseJSON);
    };

    xhr.onerror = function() {
      runHook(options, 'failure', [this, this.status, responseJSON]);
      app.notify('did-ajax', 'failure', this, this.status, responseJSON);
    };

    send(xhr, options);

    return xhr;
  };
})();
