const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const cors = require("cors");


const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

// Socket 
var time;
io.on('connection', (socket) => {

   socket.on('join',({ name, room}, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room});//
      if(error) return callback(error);
      // Welcoming in personal
      socket.emit('message', { user:"admin", text:'Welcome to the world of Conversation'});
      //Welcoming inside the group (Public Welcome)
      socket.broadcast.to(user.room).emit('message', { user:"admin", text:`${user.name} has joined the group`})
      // instead create a notification
      socket.join(user.room);
      io.to(user.room).emit('roomData',{ room: user.room, users: getUserInRoom(user.room)})
      callback();
   })

   //var time;
   socket.on('sendMessage',(message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message',{ user:user.name, text:message});

      //Auto Reply
      clearTimeout(time);
      time = setTimeout(() => {
         socket.emit('message',{ user:"admin", text:"-- User Busy --"});
      }, 30000)
      //End of Auto Reply

      io.to(user.room).emit('roomData',{ room:user.room, users: getUserInRoom(user.room)});
      callback()
   })
   

   socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if(user)
      {
         io.to(user.room).emit('message',{user:'admin', text:`${user.name} has left`})
         io.to(user.room).emit('roomData',{ room: user.room, users: getUserInRoom(user.room)})
      }
   })

})

app.use(router);
app.use(cors());

server.listen(PORT, () => {   
   console.log(`Server started on port ${PORT}`)
})