
const app = require('express')();
const PORT = process.env.PORT || 8000;
const server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});

const users=[];
const rooms= new Map();

const getUsersByRoom=(room)=>{return rooms.get(room);}

const addNewUser = ({id,room,username,isHost})=>{
  console.log(id,room,username,isHost);
  if(isHost){
    rooms.set(room,[{id,username,isHost}]);
  }
  else{ 
    var users = getUsersByRoom(room);
    console.log('users',users);
    users.push({id:id,username:username,isHost:isHost});
    console.log(rooms);
    rooms.delete(room);
    rooms.set(room,users);
  }
}


io.on('connection',(client)=>{
  client.on('join-room',({sessionID,username,isHost})=>{
    /*client.broadcast.emit('get-current-time');
    client.on('return-current-time',(data)=>{
      client.emit('join-time',data.current_time);
    })*/
    addNewUser({id:client.id,room:'room-'+sessionID,username:username,isHost:isHost});
    client.join('room-'+sessionID);
    if(!isHost){
      var users = getUsersByRoom(room);
      users.forEach(user => {
        if(user.isHost){
          client.broadcast.to(user.id).emit('join-sync-time',client.id);
        }
      });
      console.log('reaches hs');
    }
  });
  /*
  client.on('join-sync-time',(clientID)=>{
    client.broadcast.to
  });
  client.on('return-sync-time',(clientID,time)=>{

  })*/

  client.on('time-sync',(data)=>{
    console.log('data: ',data);
    //client.broadcast.emit('current-time',data);
    io.to(data.room).emit('current-time',data);
  })

  client.on('send-message',(messageData,successCallback)=>{
    io.to(client.id.room).emit('new-message', { user: messageData.username, text: messageData.message });
    successCallback()
  })
});


/*
socket.io cheatsheet
// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// list socketid
for (var socketid in io.sockets.sockets) {}
 OR
Object.keys(io.sockets.sockets).forEach((socketid) => {});

*/

