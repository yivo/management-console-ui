app.on('dom-ready', function() {

  app.utils.each(document.getElementsByClassName('js-reload-console'), function(el) {
    el.addEventListener('click', function() {
      app.console.load();
    });
  });

});
