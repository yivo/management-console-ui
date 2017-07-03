(function() {

  function showStatus() {
    var el = document.getElementById('console-status');
    el.classList.remove('hide');
    el.offsetHeight;
    el.classList.add('-appear');
  }

  function hideStatus() {
    var el = document.getElementById('console-status');
    el.classList.add('hide');
  }

  app.on('did-load-console', showStatus);

  app.on('will-load-console', hideStatus);

  app.on('did-fail-load-console', hideStatus);

})();
