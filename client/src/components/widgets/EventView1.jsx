import React from 'react'
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { Button } from "@mui/material"
function EventView1(props) {
    const { event, next } = props;
    if (!event) return;
    const start = (new Date(event.start_date.slice(0, 19)))
    const end = (new Date(event.end_date.slice(0, 19)))
    if (!event) return (<div></div>)
    const textLightStyle = "text-sm font-light mr-4"
    const iconLightStyle = "text-sm opacity-60 mr-4"
    return (
        <div className='bg-yellow-400 h-full rounded-3xl flex flex-col'>
            <div className="">
                <img className="h-60 w-full object-cover rounded-3xl" src={event.photo_link} alt="" />
            </div>

            <div className="p-4 flex-shrink-0">
                <h5 className='font-black text-3xl text-left w-56'>{event.name}</h5>
                <div className="flex items-center mt-4">
                    <PlayCircleFilledWhiteRoundedIcon className={iconLightStyle} />
                    <p className={textLightStyle}>
                        {start.toDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <TimelapseRoundedIcon className={iconLightStyle} />
                    <p className={textLightStyle}>
                        {end.toDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <LocationOnRoundedIcon className={iconLightStyle} />
                    <p className={textLightStyle}>
                        {event.location}
                    </p>
                </div>
                <div className='flex items-center'>
                    <CategoryRoundedIcon className={iconLightStyle} />
                    <p className={textLightStyle}>{event.type}</p>
                    <p className={textLightStyle}>|</p>
                    <ExtensionRoundedIcon className={iconLightStyle} />
                    <p className={textLightStyle}>{event.theme}</p>
                </div>
                <div className='mt-4'>

                    <p className={textLightStyle + " text-left"}>
                        {event.description}
                    </p>
                </div>
            </div>
            <div className="flex flex-grow justify-center items-end mb-4">
                <Button variant='contained' endIcon={<FavoriteRoundedIcon />} onClick={next} className='bg-black  rounded-2xl w-3/4'>Show Interest</Button>
            </div>

        </div>
    )
}

export default EventView1