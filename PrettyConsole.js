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
  
  buffer: '  ',
  
  pusher: function(fgColor, oarguments){
    var a, args, i, len, lines, li, lineslen;
    
    args = [this.buffer, new Date().toUTCString(), fgColor];
    
    for (i = 0, len = oarguments.length; i < len; i++) {
      a = oarguments[i];
      
      lines = a.match(/[^\r\n]+/g);
      
      if(lines.length > 1){
        for (li = 1, lineslen = lines.length; li < lineslen; li++) {
          lines[li] = this.buffer + this.buffer + lines[li];
        }
        
        a = lines.join("\n");
      }
      
      args.push(a);
    }
    args.push(this.colors.Reset);
    
    return args;
  },

  log: function() {
    return console.log.apply(this, this.pusher(this.colors.FgWhite, arguments));
  },

  warn: function() {
    return console.warn.apply(this, this.pusher(this.colors.FgYellow, arguments));
  },

  error: function() {
    return console.error.apply(this, this.pusher(this.colors.FgRed, arguments));
  },

  info: function() {
    return console.info.apply(this, this.pusher(this.colors.FgCyan, arguments));
  }
};