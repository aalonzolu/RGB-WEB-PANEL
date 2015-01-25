//Autor: Andy Alonzo
//Web: http://soyalonzo.com
//E-mail: andres@alonzoyalonzo.com
//Twitter: @alonzoandy

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , os = require('os')
  , five = require("johnny-five"),
  board;
  var ledRGB;

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
}}}
var port = 3000;
app.listen(port);
if(addresses==[])
{
    console.log("Server running at: http://localhost:"+port);
}
else
{
    console.log("Server running at: http://"+addresses+":"+port);
}

board = new five.Board();
var led = [];
board.on("ready", function() {
    ledRGB = new five.Led.RGB([3, 5, 6]);
});


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
io.sockets.on('connection', function (socket) {
  socket.on('led', function (data) {
    console.log("ON  =>    Led L" + data.led);
     if(board.isReady){    ledRGB.color("#"+data.led); }
  });

    socket.on('off', function (data) {
    console.log("OFF  =>    Led :" + data.led);
     if(board.isReady){    ledRGB.off(); }
  });
});
