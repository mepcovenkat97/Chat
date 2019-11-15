import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './join.css';

const Join = () => {

   //similar to state variable in class based components
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');

   return (
      <div className="joinOuterContainer">
         <div className="joinInnerContainer">
            <h3 className="heading">Join</h3>
            <div>
               <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
               <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
            </div>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
               <button className="button mt-20" type="submit">Sign In</button>
            </Link>
         </div>
      </div>
   )
}

export default Join;