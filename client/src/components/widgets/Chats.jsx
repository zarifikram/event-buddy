import React from 'react'
import IndividualChat from './IndividualChat';

function Chats(props) {
    const { messages, user } = props;

    return (
        <div className='overflow-auto flex flex-col-reverse'>
            <div className="">
                {messages.map((message, index) => <IndividualChat user={user} message={message} />)}
            </div>
        </div>
    )
}

export default Chats