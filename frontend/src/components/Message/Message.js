import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({message:{ user, text }, name}) => {
   let isSentByCurrentUser = false;
   const trimName = name.trim().toLowerCase();

   if(user === trimName)
   {
      isSentByCurrentUser = true;
   }

   return (
      isSentByCurrentUser
      ? (
         <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">you</p>
            <div className="messageBoxR backgroundBlue">
               <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            </div>
         </div>
      )
      : (
         <div className="messageContainer justifyStart">
            <div className="messageBoxL backgroundLight">
               <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10">{user}</p>
         </div>
      )
   )
}

export default Message;