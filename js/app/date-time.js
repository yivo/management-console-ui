app.on('dom-ready', function() {
  var el = document.getElementById('date-time');

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function update() {
    var date = new Date();
    el.innerText = date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) +
                   ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
  }

  setInterval(update, 1000);
});
