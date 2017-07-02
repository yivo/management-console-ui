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


app.on('will-ajax', function(xhr) {
  xhr.setRequestHeader('X-API-Key', 'XXX');
});

app.on('did-ajax', function(result, xhr, status, responseJSON) {
  console.log(arguments);
});

app.on('dom-ready', function() {

  app.utils.ajax('GET', 'http://management-console-api-mock.site/clients/1/buttons', {
    success: function(xhr, status, responseJSON) {
      console.log(responseJSON)
    }
  });

});
