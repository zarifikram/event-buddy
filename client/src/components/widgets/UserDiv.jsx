import React from 'react'

function UserDiv(props) {
    const { user } = props;
    console.log(user);
    return (
        <div className='bg-yellow-400 w-full rounded-2xl py-8 flex flex-col items-center'>
            <div className="mb-4">
                <img className="h-12 object-cover rounded-full" src={(user.photo_link)} alt="" />
            </div>
            <h1 className='font-extrabold'>{user.first_name} {user.last_name}</h1>
        </div>
    )
}

export default UserDiv