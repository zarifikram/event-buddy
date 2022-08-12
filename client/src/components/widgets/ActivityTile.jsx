import React from 'react'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { yellow } from '@mui/material/colors';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function ActivityTile(props) {
    const { activity } = props;
    const user = useContext(userContext);
    console.log(activity);
    if (activity.type === 'message') return (
        <div className='flex items-center gap-1 border-b-[1px] w-full border-opacity-50 mt-2'>
            <MessageRoundedIcon className={` ${activity.type === "message" ? "text-green-500" : "text-yellow-500"}`} />
            <div className="h-12">
                <h5 className='text-left text-xs font-bold'>{activity.fromid}</h5>
                <p className='text-left text-xs font-thin'>has messaged you.</p>
            </div>
        </div>
    )
    else if (activity.type === 'request') return (
        <div className='flex items-center gap-1 border-b-[1px] w-full border-opacity-50 mt-2'>
            <MessageRoundedIcon className={` ${activity.type === "message" ? "text-green-500" : "text-yellow-500"}`} />
            <div className="h-12">
                <h5 className='text-left text-xs font-bold'>{activity.fromid}</h5>
                <p className='text-left text-xs font-thin'>has requested to join as event-buddy.</p>
            </div>
        </div>
    )
    else return (
        <div className='flex items-center gap-1 border-b-[1px] w-full border-opacity-50 mt-2'>
            <DoneAllIcon className={`text-green-500`} />
            <div className="h-12">
                <h5 className='text-left text-xs font-bold'>{activity.fromid}</h5>
                <p className='text-left text-xs font-thin'>has accepted your event-buddy request!</p>
            </div>


        </div>
    )
    
}

export default ActivityTile