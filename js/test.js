app.on('dom-ready', function() {
  app.flashesManager.show({
    text: 'Action successfully completed',
    icon: { src: './img/icon-success.svg' }
  });

  setTimeout(function() {
    app.flashesManager.show({
      text: 'Your action failed to complete',
      icon: { src: './img/icon-failure.svg' }
    });
  }, 2000);

  setTimeout(function() {
    app.flashesManager.show({
      text: 'Working on it...',
      icon: { src: './img/icon-gear.svg' }
    });
  }, 4000);

  setTimeout(function() {
    app.flashesManager.show({
      text: 'Console successfully loaded',
      icon: { src: './img/icon-success.svg' }
    });
  }, 6000);
});
