import React from 'react'

function IndividualChat(props) {
    const { message, user } = props;

    return ((message.fromid == user.username) ?
        <div className={`w-full flex justify-end my-2`}>
            <div className={`bg-black p-4 rounded-2xl ${message.type === 'auto' ? "bg-red-800" : ""}`}>
                <h1 className='text-sm text-white'>
                    {message.message}
                </h1>
            </div>
        </div> :
        <div className="w-full flex my-2">
            <div className={`bg-yellow-50 rounded-2xl p-4 ${message.type === 'auto' ? "bg-red-200" : ""}`}>
                <h1 className='text-sm'>
                    {message.message}
                </h1>
            </div>
        </div>
    )
}

export default IndividualChat