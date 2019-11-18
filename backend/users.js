const { User } = require('./models/users');
const { Message } = require('./models/messages');
const { Room } = require('./models/room');
const users = [];

const addUser = ({ id, name, room}) => {
      name = name.trim().toLowerCase();
      room = room.trim().toLowerCase();
      //Check Database
      //const existingUser = await User.findOne({name:name})
      const existingUser = users.find((user) => user.name === name && user.room === room);

      if(existingUser){
         return {error : "Username is Taken"};
      }
      const user = { id, name, room };
      //console.log(user)
      users.push(user);

      return { user };
}

const removeUser = (id) => {
   const index = users.findIndex((user) => user.id === id)
   if(index !== -1)
   {
      return users.splice(index,1)[0];
   }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserInRoom}