import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ChatRecepient from '../widgets/ChatRecepient';
import MessageRequestDiv from '../widgets/MessageRequestDiv';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';

function MessageRequestPage() {
  const [recepients, setRecepients] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getRecepient = (value) => setSelectedIndex(value);
  const user = useContext(userContext);

  const getData = require('../getData')
  useEffect(() => { getData.default(`/apis/user/messageRequests/${user.username}`, setRecepients) }, []);

  return (recepients.length === 0 ? <div className='text-3xl flex justify-center items-center h-full'> There are no message request at the moment. </div>  :
    <div className='flex w-full justify-between h-screen'>
      <ChatRecepient recepients={recepients} getRecepient={getRecepient} selectedIndex={selectedIndex} />
      <MessageRequestDiv recepient={recepients[selectedIndex]} />
    </div>
  )
}

export default MessageRequestPage