import React from 'react'
import { Button, TextField } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';
import axios from 'axios';
function ChatTypingBox(props) {
    
    const { recepient, refreshMessages, selectedIndex } = props;
    const [message, setMessage] = useState("")
    const user = useContext(userContext)
    const onMessageType = (e) => setMessage(e.target.value);
    
    const onMessageSend = (message, from, to) => {
        axios.post('http://localhost:2000/apis/user/newmessage', { message: message, from: from, to: to }).then((e) => refreshMessages(selectedIndex))
    }
    return (
        <div className='flex items-center justify-between bg-yellow-50 w-full rounded-2xl px-4 py-2'>
            <TextField
                size='small'
                className='flex-grow mr-2 rounded-xl'
                variant='outlined'
                placeholder="Enter your message here"
                value={message}
                onChange={onMessageType}
            />
            <Button
                variant='contained'
                className='bg-black rounded-xl'
                onClick={() => { onMessageSend(message, user.username, recepient.username); setMessage("") }}
            >
                <p>Send</p>
                <SendRoundedIcon />
            </Button>
        </div>
    )
}

export default ChatTypingBox