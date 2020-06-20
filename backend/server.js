const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = require('express')();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

const server = require('http').createServer(app);
var io = require('socket.io')(server);
const router = express.Router();

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});

var socketList = [];
io.on('connection',(client)=>{
  client.on('join-room',(data)=>{
    
  });

  client.on('time-sync',(data)=>{
    console.log('cleitns:',io.clients,'data: ',JSON.stringify(data));
    for (socket in io.clients){
        socket.broadcast.emit('current-time',data);
    }
  })
});



