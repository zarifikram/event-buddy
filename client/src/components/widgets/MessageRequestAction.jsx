import React, { useState } from 'react'
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Button, Slider } from "@mui/material"
import axios from 'axios';

function MessageRequestAction(props) {
    const { recepient } = props;
    const textLightStyle = "text-sm text-left font-light mr-4"
    const iconLightStyle = "text-sm opacity-60 mr-4"
    const start = (new Date(recepient.start_date.slice(0, 19)))
    const end = (new Date(recepient.end_date.slice(0, 19)))
    const startPref = (new Date(recepient.start_time.slice(0, 19)))
    const endPref = (new Date(recepient.end_time.slice(0, 19)))
    const step = (endPref - startPref) / 1000;
    const onStartTimeChange = (e, startTime) => setStartTime(startTime);
    const [startTime, setStartTime] = useState(startPref);
    const valToDate = (val) => { const x = new Date(val); return x.toLocaleString(); }
    const onConfirm = () => {
        const body = {fromId:recepient.fromid, toId:recepient.toid, eventId:recepient.eventid, startTime:startTime}
        axios.post('http://localhost:2000/apis/user/confirm', body).then((e)=>alert("Event Buddy Confirmed! Now you can chat with each other!"));
        
    }
    return (
        <div className='m-4 rounded-3xl w-1/2 flex flex-col'>
            <div className="w-full ">
                <img className="h-60 w-full object-cover rounded-3xl" src={recepient.event_photo_link} alt="" />
            </div>
            <div className="p-4 flex-shrink-0">
                <h5 className='font-black text-xl text-left'>{recepient.name}</h5>
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
                        {recepient.location}
                    </p>
                </div>
                <div className='flex items-center '>
                    <CategoryRoundedIcon className={iconLightStyle} />
                    <p className={textLightStyle}>{recepient.type}</p>
                    <p className={textLightStyle}>|</p>
                    <ExtensionRoundedIcon className={iconLightStyle} />
                    <p className={textLightStyle}>{recepient.theme}</p>
                </div>
            </div>
            <div className="flex flex-col items-left px-4">
                <p className={textLightStyle}>Time Preference</p>
                <Slider
                    min={startPref - 1}
                    max={endPref}
                    value={startTime}
                    valueLabelDisplay="auto"
                    onChange={onStartTimeChange}
                    // disableSwap
                    step={step}
                    className="text-black"
                    valueLabelFormat={(x) => { x = new Date(x); return x.toLocaleString() }}
                />
            </div>
            <div>
                <p>
                    You will be meeting at
                </p>
                <h1>{valToDate(startTime)}</h1>
            </div>
            <div className="flex flex-grow justify-center items-end mb-4">
                <Button variant='contained' endIcon={<FavoriteRoundedIcon />} onClick={onConfirm} className='bg-black hover:bg-yellow-800 rounded-2xl w-full'>Confirm EVENT BUDDY</Button>
            </div>

        </div>
    )
}

export default MessageRequestAction