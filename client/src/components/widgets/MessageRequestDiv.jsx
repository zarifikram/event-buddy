import React from 'react'
import MessageRequestAction from './MessageRequestAction';
import MessageRequestPeople from './MessageRequestPeople';

function MessageRequestDiv(props) {
    const { recepient } = props;
    return (
        <div className='flex bg-yellow-400 flex-grow m-4 rounded-3xl '>
            <MessageRequestPeople recepient = {recepient} />
            <MessageRequestAction recepient = {recepient} />
        </div>
    )
}

export default MessageRequestDiv