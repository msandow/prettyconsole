module.exports = {
  colors: {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
  },

  log: function() {
    var a, args, i, len;
    args = ['  ', new Date().toUTCString(), this.colors.FgWhite];
    for (i = 0, len = arguments.length; i < len; i++) {
      a = arguments[i];
      args.push(a);
    }
    args.push(this.colors.Reset);
    return console.log.apply(this, args);
  },

  warn: function() {
    var a, args, i, len;
    args = ['  ', new Date().toUTCString(), this.colors.FgYellow];
    for (i = 0, len = arguments.length; i < len; i++) {
      a = arguments[i];
      args.push(a);
    }
    args.push(this.colors.Reset);
    return console.warn.apply(this, args);
  },

  error: function() {
    var a, args, i, len;
    args = ['  ', new Date().toUTCString(), this.colors.FgRed];
    for (i = 0, len = arguments.length; i < len; i++) {
      a = arguments[i];
      args.push(a);
    }
    args.push(this.colors.Reset);
    return console.error.apply(this, args);
  },

  info: function() {
    var a, args, i, len;
    args = ['  ', new Date().toUTCString(), this.colors.FgCyan];
    for (i = 0, len = arguments.length; i < len; i++) {
      a = arguments[i];
      args.push(a);
    }
    args.push(this.colors.Reset);
    return console.info.apply(this, args);
  }
};