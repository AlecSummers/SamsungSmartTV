var net = require('net');
var fs = require('fs');
 
// file name for the current log
var fileName = null;
 
// Start a TCP Server
var server = net.createServer(function (socket) {
 
  // Log what the TV sends
  socket.on('data', function (data) {
    if (fileName == null) {
      fileName = __dirname + '/logs/log_' + new Date().getTime();
    }

    var log = '[TV] ' + data;
    fs.appendFileSync(fileName, log);
    console.log(log);
  });
 
  // TV disconnected
  socket.on('end', function () {
    console.log('\033[2J');
            
    var log = '[TV] disconnected';
            
    fs.appendFileSync(fileName, log);
            
    console.log(log)
            
    fileName = null;
  });
});
 
// listen to the port which the TV connects to
var port = 45634;
server.listen(port);
 
console.log('The debugging server is listening to port: ' + port);
console.log('Waiting for TV messages...');
