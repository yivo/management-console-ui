app.events = {};

app.notify = function(event) {
  if (this.events[event] != null) {
    var i    = 0;
    var args = [];
    var self = this;
    while (++i < arguments.length) { args.push(arguments[i]) }
    this.events[event].slice().forEach(function(callback) { callback.apply(self, args); });
  }
  return this;
};

app.on = function(event, callback) {
  if (this.events[event] == null) { this.events[event] = [] }
  this.events[event].push(callback);
  return this;
};

app.off = function(event, callback) {
  if (this.events[event] != null) {
    this.events[event] = this.events[event].filter(function(c) { return c !== callback });
  }
  return this;
};
