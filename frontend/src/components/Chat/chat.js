import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
let socket;

const Chat = ({ location }) => {

   //similar to state variable in class based components
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');
  // const [reply, setReply] = useState('');
   const [users, setUsers] = useState('');
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState('');
   const ENDPOINT = 'https://crayond-chat-application.herokuapp.com/';

   //useEffect - similar to componentDidMount but will render all the times (similar to combining all the ComponentDid...() functions)
   useEffect(()=>{
      const { name, room } = queryString.parse(location.search);

      socket = io(ENDPOINT);

      setName(name);
      setRoom(room);

      socket.emit('join',{ name, room}, () => {
        
      })
      return () => {
         socket.emit('disconnect');
         socket.off();
      }

   },[ENDPOINT, location.search])
   //[ENDPOINT, location.search] - indicates useEffect will render only if there is a change in these values
//
   useEffect(() => {
      socket.on('message', (message)=> {
         setMessages([...messages,message])
      })

      socket.on('roomData', ({ users }) => {
         setUsers(users);
       })

       return () => {
         socket.emit('disconnect');
         socket.off();
      }
   },[messages,users])


   const sendMessage = (event) =>{
      event.preventDefault();
      //const timeout = setInterval(myFunc, 3005);
      if(message)
      {
         socket.emit('sendMessage', message, () => setMessage(''))
      }
   } 


   console.log(message, messages);

   return (
      <div className="outerContainer">
         <div className="container">
            <InfoBar room={room}/>
            <Messages messages = {messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
         </div>
         <TextContainer users={users}/>
      </div>
   )
}

export default Chat;