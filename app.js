var i = 0;  // dots counter
setInterval(function() {
    process.stdout.clearLine();  // clear current text
      process.stdout.cursorTo(0);  // move cursor to beginning of line
        i = (i + 1) % 4;
          var dots = new Array(i + 1).join(".");
            process.stdout.write("Waiting" + dots);  // write text

}, 300);

var keypress = require('keypress');
 
// make `process.stdin` begin emitting "keypress" events 
keypress(process.stdin);
 
// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.exit();

  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();
