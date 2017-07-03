app.on('did-load-console', function(console) {
  setTimeout(function() {
    app.flashesManager.show({
      text: 'Console successfully ' + (console.loadsCount > 1 ? 're' : '') + 'loaded',
      icon: { src: './img/icon-success.svg' }
    });
  }, 300);
});
