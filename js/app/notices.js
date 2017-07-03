(function() {

  function hideNotices() {
    app.utils.each(document.getElementsByClassName('js-console-notice'), function(block) {
      block.classList.add('hide')
    });
  }

  app.on('will-load-console', function(console) {
    if (console.loadsCount > 0) {
      hideNotices();
      document.getElementById('console-loading-progress-notice').classList.remove('hide');
    }
  });

  app.on('did-fail-load-console', function(console) {
    hideNotices();
    document.getElementById('console-loading-failure-notice').classList.remove('hide');
  });

  app.on('did-load-console', function(console, request) {
    hideNotices();

    if (request.responseJSON.buttons.length === 0) {
      document.getElementById('zero-console-buttons-notice').classList.remove('hide');
    }
  });

})();
