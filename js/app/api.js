app.on('will-ajax', function(xhr) {
  xhr.setRequestHeader('X-API-Key', 'XXX');
});
