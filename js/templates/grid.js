app.templates.grid = (function() {

  function calculateAverageCellWidth(buttons) {
    var totalTitlesLength = buttons.reduce(function(n, btn) {
      return n + btn.title.length;
    }, 0);

    var width = Math.round(totalTitlesLength / buttons.length * 15 + 30);

    width = Math.max(width, 150);
    width = Math.min(width, 250);
    return width;
  }

  return function(data) {
    var cell = { width: calculateAverageCellWidth(data.buttons) };

    return app.templates.gridLayout(data, function() {
      return data.buttons.map(function(button) {
        return app.templates.gridCell(cell, function() {
          return app.templates.gridButton(button);
        });
      });
    });
  };
})();

app.templates.gridLayout = function(data, next) {
  var buf = [];
  buf.push('<div class="console-grid">');
    buf.push('<div class="console-grid-title">', app.utils.escapeHTML(data.title), '</div>');
    buf.push('<div class="console-grid-cells">');
    buf = buf.concat(next());
    buf.push('</div>');
  buf.push('</div>');
  return buf.join('');
};

app.templates.gridCell = function(cell, next) {
  return [
    '<div class="console-grid-cell" style="width: ' +  app.utils.escapeHTML(cell.width) + 'px;">',
      next(),
    '</div>'
  ].join('');
};

app.templates.gridButton = function(button) {
  return [
    '<div class="console-grid-button">',
      '<button class="console-grid-button-action" type="button">',
        app.utils.escapeHTML(button.title),
      '</button>',
      '<button class="console-grid-button-info" type="button"></button>',
    '</div>'
  ].join('');
};
