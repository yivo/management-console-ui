app.on('did-load-console', function(console) {
  if (console.loadsCount === 1) {
    window.console.debug('Console loaded');
  }
});

app.on('will-complete-console-action', function() {
  console.debug('Initiated console action');
});

app.on('did-complete-console-action', function() {
  console.debug('Completed console action');
});

app.on('did-fail-complete-console-action', function() {
  console.debug('Failed console action');
});
