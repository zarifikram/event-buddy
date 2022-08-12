import React, { useState, useEffect, useContext } from 'react'
import ChatRecepient from '../widgets/ChatRecepient';
import Inbox from '../widgets/Inbox';
import axios from 'axios';
import { userContext } from '../../contexts/UserContext';
import { io } from 'socket.io-client'
import { CircularProgress } from '@mui/material';

function MessagePage() {
  // static data for building page. Later call api to get message

  const [recepients, setRecepients] = useState([]);
  const [selectedIndex, setSelectIndex] = useState(0);

  const getRecepient = (value) => {
    setSelectIndex(value)
    console.log("selected index is now " + selectedIndex + "and user is" + recepients[selectedIndex].username)

  };
  const findInd = (username) => recepients.map((e) => e.username).indexOf(username);
  const user = useContext(userContext);
  const getData = require('../getData')
  useEffect(() => {
    getData.default(`http://localhost:2000/apis/user/messageRecepients/${user.username}`, setRecepients);
  }, []);




  return recepients.length === 0 ? <div className='text-3xl flex justify-center items-center h-full'> There are no messages at the moment. </div>  : (
    <div className='flex w-full justify-between h-screen'>
      <ChatRecepient recepients={recepients} getRecepient={getRecepient} selectedIndex={selectedIndex} />
      {<Inbox recepient={recepients[selectedIndex]} selectedIndex={selectedIndex} />}
    </div>
  )
}

export default MessagePage