import React from 'react'
import { CircularProgress } from "@mui/material"
import UserDiv from './UserDiv';
import RecepientBox from './RecepientBox';
import { useContext } from 'react';
import { userContext } from './../../contexts/UserContext'
function ChatRecepient(props) {
    const { recepients, getRecepient, selectedIndex } = props;
    const recepient = recepients[selectedIndex];
    const user = useContext(userContext);

    return (
        recepients.length === 0 ? <CircularProgress /> :
            <div className=' w-60 h-screen flex flex-shrink-0 flex-col items-center p-4'>
                <UserDiv user={user} />
                <p className='font-bold text-xs text-left w-full mt-4'>Active Conversations</p>
                <div className="flex flex-col items-start w-full  overflow-y-scroll cursor-all-scroll">
                    {recepients.map((recepient, index) => <RecepientBox recepient={recepient} index={index} selectedIndex={selectedIndex} getRecepient={getRecepient} />)}
                </div>
            </div>
    )
}

export default ChatRecepient