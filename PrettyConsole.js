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

  censor: function(o){
    var seenObjs = [],
    walker = function(o){
      var ok, i, len, no;
      
      if(seenObjs.indexOf(o) > -1){
        return "[Circular]";
      }

      if(Array.isArray(o)){
        if(o.length){
          seenObjs.push(o);
        }
        
        no = []
        
        for (i = 0, len = o.length; i < len; i++) {
          if(typeof o[i] === 'object' && o[i] !== null){
            no.push(walker(o[i]));
          }else{
            no.push(o[i]);
          }
        }
      }else{
        if(Object.keys(o).length){
          seenObjs.push(o);
        }
        
        no = {};
        
        for(ok in o){
          if(o.hasOwnProperty(ok)){
            if(typeof o[ok] === 'object' && o[ok] !== null){
              no[ok] = walker(o[ok]);
            }else{
              no[ok] = o[ok];
            }
          }
        }
      }
      
      return no;
    };
    
    return function(k, v){
      if(typeof v !== 'object' || v === null){
        return v;
      }
      return walker(v);
    };
  },

  stringify: function(oarguments){
    var i, len;
    
    for (i = 0, len = oarguments.length; i < len; i++) {
      if(typeof oarguments[i] === 'object' && oarguments[i] !== null){
        oarguments[i] = JSON.stringify(oarguments[i], this.censor(oarguments[i]), 2);
      }
    }
    
    return oarguments;
  },
  
  pusher: function(fgColor, oarguments){
    var a, args, i, len, lines, li, lineslen;
    
    args = [this.buffer, new Date().toUTCString(), fgColor];
    
    for (i = 0, len = oarguments.length; i < len; i++) {
      a = String(oarguments[i]);
      
      lines = a.match(/[^\r\n]+/g);

      if(lines && lines.length > 1){
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
    return console.log.apply(this, this.pusher(this.colors.FgWhite, this.stringify(arguments)));
  },

  warn: function() {
    return console.warn.apply(this, this.pusher(this.colors.FgYellow, this.stringify(arguments)));
  },

  error: function() {
    return console.error.apply(this, this.pusher(this.colors.FgRed, this.stringify(arguments)));
  },

  info: function() {
    return console.info.apply(this, this.pusher(this.colors.FgCyan, this.stringify(arguments)));
  },

  debug: function() {
    var stk = (new Error).stack.split('at '),
    stkidx = stk.findIndex(function(s){return /PrettyConsole\.js/.test(s)});
    [].push.call(arguments, '\n', this.colors.Hidden, new Date().toUTCString(), this.colors.Reset, this.colors.FgMagenta, " " +stk[stkidx+1].trim());
    return console.info.apply(this, this.pusher(this.colors.FgMagenta, this.stringify(arguments)));
  }
};