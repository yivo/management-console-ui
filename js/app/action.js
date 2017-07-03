document.addEventListener('click', function(event) {
  if (event.target.classList.contains('js-console-action-button')) {
    app.console.performAction(event.target.getAttribute('data-button-id'));
  }
});

(function() {

  function disableButton(button) { button.disabled = true; }
  function enableButton(button) { button.disabled = false; }

  function disableButtons() {
    app.utils.each(document.getElementsByClassName('js-console-action-button'), disableButton);
    app.utils.each(document.getElementsByClassName('js-console-action-info'), disableButton);
  }

  function enableButtons() {
    app.utils.each(document.getElementsByClassName('js-console-action-button'), enableButton);
    app.utils.each(document.getElementsByClassName('js-console-action-info'), enableButton);
  }

  app.on('will-perform-console-action', disableButtons);
  app.on('did-perform-console-action', enableButtons);
  app.on('did-fail-perform-console-action', enableButtons);

})();

