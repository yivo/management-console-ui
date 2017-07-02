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

  function buildRequestResult(xhr) {
    return {
      xhr:          xhr,
      status:       xhr.status,
      response:     xhr.response,
      responseJSON: parseJSON(xhr.response)
    }
  }

  return function(method, url, options) {
    if (options == null) { options = {}; }

    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onload = function() {
      var request     = buildRequestResult(xhr);
      request.success = this.status >= 200 && this.status < 400;
      request.failure = !request.success;

      runHook(options, request.success ? 'success' : 'failure', [request]);
      app.notify('did-ajax', request);
    };

    xhr.onerror = function() {
      var request     = buildRequestResult(xhr);
      request.success = false;
      request.failure = !request.success;

      runHook(options, 'failure', [request]);
      app.notify('did-ajax', request);
    };

    xhr.onabort = function() {
      var request     = buildRequestResult(xhr);
      request.success = false;
      request.failure = !request.success;
      request.aborted = true;

      runHook(options, 'failure', [request]);
      app.notify('did-ajax', request);
    };

    send(xhr, options);

    return xhr;
  };
})();
