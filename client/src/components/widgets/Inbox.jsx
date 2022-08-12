import React, { useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client';
import { userContext } from '../../contexts/UserContext';
import getData from '../getData';
import Chats from './Chats';
import ChatTypingBox from './ChatTypingBox';

function Inbox(props) {
  const { recepient, selectedIndex } = props;
  const user = useContext(userContext);
  const [messages, setMessages] = useState([]);
  const refreshMessages = (value) => {
    if(recepient === null) return;
    console.log(value + " " + recepient.username);
    getData(`http://localhost:2000/apis/user/messages/${user.username}/${recepient.username}`, setMessages);
  }
  
  useEffect(() => {
    refreshMessages(selectedIndex)
    const socket = io('http://localhost:2000')
    
    socket.on('connect', () => console.log(socket.id))
    socket.on(user.username, () => refreshMessages(selectedIndex));
    return () => {
      socket.off('connect')
      socket.off(user.username)
    }
  }
    , [recepient]);

  return (
    <div className='flex flex-col justify-end flex-grow bg-yellow-400 m-4 rounded-2xl p-2'>
      <Chats messages={messages} user={user} />
      <ChatTypingBox recepient={recepient} refreshMessages = {refreshMessages} selectedIndex = {selectedIndex}/>
    </div>
  )
}

export default Inbox