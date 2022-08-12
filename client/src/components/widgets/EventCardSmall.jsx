import { CardActionArea } from '@mui/material';
import React from 'react'

function EventCardSmall(props) {
    const { eventObj, goToEvents } = props;
    return (
        <CardActionArea onClick={()=>goToEvents(eventObj.id)}>
            <div className='w-full my-2 '>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <img className="aspect-square before:block before:pt-96 object-cover rounded-3xl" src={eventObj.photo_link} alt="" />
                    <h1 className='text-xs mt-1 h-7 overflow-hidden font-bold'>{eventObj.name.length > 15 ? eventObj.name.slice(0, 15) + "..." : eventObj.name}</h1>
                </div>
            </div>
        </CardActionArea>
    )
}

export default EventCardSmall