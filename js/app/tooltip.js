document.addEventListener('click', function(event) {
  app.utils.each(document.querySelectorAll('.js-console-action-info.-active'), function(el) {
    if (el !== event.target) {
      el.classList.remove('-active');
    }
  });

  if (event.target.classList.contains('js-console-action-info')) {
    if (event.target.classList.contains('-active')) {
      event.target.classList.remove('-active');
    } else {
      event.target.classList.add('-active');
    }
  }
});
