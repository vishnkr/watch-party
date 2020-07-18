
const app = require('express')();
const PORT = process.env.PORT || 8000;
const server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});


io.on('connection',(client)=>{
  client.on('join-room',(data)=>{
    
  });

  client.on('time-sync',(data)=>{
    console.log('data: ',data);
    client.broadcast.emit('current-time',data);
    
  })
});



