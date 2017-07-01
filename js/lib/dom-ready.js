// DOMContentLoaded – 97% – http://caniuse.com/#search=domcontentloaded
(function() {
  function ready() {
    document.removeEventListener('DOMContentLoaded', ready);
    app.notify('dom-ready')
  }

  if (document.readyState !== 'loading') {
    setTimeout(ready);
  } else {
    document.addEventListener('DOMContentLoaded', ready);
  }
})();
