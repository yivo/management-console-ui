(function() {

  function showStatus() {
    var el = document.getElementById('console-status');
    el.classList.remove('hide');
    el.offsetHeight;
    el.classList.add('-appear');
  }

  function hideStatus() {
    var el = document.getElementById('console-status');
    el.classList.add('hide');
  }
  
})();
