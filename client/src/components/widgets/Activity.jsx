import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';
import getData from '../getData';
import ActivityTile from './ActivityTile';

function Activity() {
    const [activities, setActivites] = useState([]);
    const user = useContext(userContext);
    useEffect(() => {
        getData(`/apis/user/activities/${user.username}`, setActivites);
    }, []);

    return (
        <div className='pr-2 w-1/4'>
            <div className="flex flex-col items-start p-4 bg-yellow-100 rounded-3xl h-full w-full">
                <h1 className='font-bold text-gray-700 mb-4'>Activity</h1>
                {activities.map((activity, ind) => <ActivityTile activity={activity} />)}
            </div>
        </div>
    )
}

export default Activity