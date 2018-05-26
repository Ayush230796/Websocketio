var express = require('express');
var socket =require('socket.io');

//App setup
var app = express();
var server = app.listen(4000,function(){
  console.log('now listening to requests on port 4000');
});

//serve static files
app.use('/assets', express.static('assets'));

//websocket
var io = socket(server);
io.on('connection', function(socket){
  console.log('made socket connection', socket.id);

  socket.on('chat',function(data){
    io.emit('chat', data);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing', data);
  });
});
