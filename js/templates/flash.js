app.templates.flash = function(flash) {
  var esc = app.utils.escapeHTML;

  if (flash.icon == null) { flash.icon = {} }
  if (flash.icon.width == null) { flash.icon.width = 20 }
  if (flash.icon.height == null) { flash.icon.height = 20 }

  return [
    '<div class="console-flash hide">',
      '<img class="console-flash-icon" ' +
        'src="' + esc(flash.icon.src) + '" ' +
        'width="' + esc(flash.icon.width) + '" ' +
        'height="' + esc(flash.icon.height) + '">',
      '&nbsp;',
      '<span class="console-flash-text">' + esc(flash.text) + '</span>',
    '</div>'
  ].join('');
};
