app.on('did-load-console', function(console) {
  setTimeout(function() {
    app.flashesManager.show({
      text: 'Console successfully ' + (console.loadsCount > 1 ? 're' : '') + 'loaded',
      icon: { src: './img/icon-success.svg' }
    });
  }, 300);
});

app.on('will-perform-console-action', function() {
  app.flashesManager.show({
    text: 'Working on it...',
    icon: { src: './img/icon-gear.svg' }
  });
});

app.on('did-perform-console-action', function() {
  app.flashesManager.show({
    text: 'Action successfully completed',
    icon: { src: './img/icon-success.svg' }
  });
});

app.on('did-fail-perform-console-action', function() {
  app.flashesManager.show({
    text: 'Your action failed to complete',
    icon: { src: './img/icon-failure.svg' }
  });
});
