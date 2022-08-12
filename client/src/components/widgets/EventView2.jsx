import React, { useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button, IconButton, Slider } from '@mui/material';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';
import axios from 'axios';

function EventView2(props) {
    const { event, prev, next } = props;
    const textLightStyle = "text-xs text-left font-light pt-4"
    const start = (new Date(event.start_date.slice(0, 19)))
    const end = (new Date(event.end_date.slice(0, 19)))
    const [pref, setPref] = useState({ startEnd: [start, end], gender: "male" });
    const step = (end - start) / 100
    const onStartEndChange = (e, nextValue) => setPref({ ...pref, startEnd: nextValue });
    const onGenderPrefChange = (e) => setPref({ ...pref, gender: e.target.value });
    const user = useContext(userContext);
    const onSubmit = () => {
        axios.post(`/apis/user/events/interest/${user.username}/${event.id}`, pref).catch((e) => console.log(e));
        next();
    }

    return (
        <div className='bg-yellow-400 rounded-3xl h-full flex flex-col'>
            <div className="flex items-center">
                <IconButton onClick={prev}>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <h5 className='font-medium text-sm xl:text-xl text-left'>{event.name}</h5>
            </div>
            <div className="">
                <img className="h-60 w-full object-cover rounded-b-3xl" src={event.photo_link} alt="" />
            </div>
            <div className="px-4">

                <p className={textLightStyle}>To get event-buddies, please specify the time you are avaiable to attend {event.name}. </p>
                {/* <p className={textLightStyle}>Based on your time and gender preference, you will be able to make event-buddy request and get requests from other event-buddies!</p> */}
                <div className="flex flex-col">
                    <p className={textLightStyle}>Time Preference</p>
                    <Slider
                        min={start - 1}
                        max={end}
                        value={pref.startEnd}
                        valueLabelDisplay="auto"
                        onChange={onStartEndChange}
                        // disableSwap
                        step={step}
                        className="text-black"
                        valueLabelFormat={(x)=>{x=new Date(x); return x.toLocaleString()}}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className={textLightStyle}>Gender Preference</p>
                    <div className="flex md:flex-col gap-4">
                        <Button variant='contained' value={"male"} onClick={onGenderPrefChange} className={`${pref.gender=='male' ? "bg-blue-800 " : ""}border-4 border-blue-800 hover:bg-blue-600 flex-1 rounded-3xl`}>Male</Button>
                        <Button variant='contained' value={"female"} onClick={onGenderPrefChange} className={`${pref.gender=='female' ? "bg-red-800 " : ""}hover:bg-red-600 flex-1 rounded-3xl`}>Female</Button>
                        <Button variant='contained' value={"both"} onClick={onGenderPrefChange} className={`${pref.gender=='both' ? "bg-gray-800 " : ""}hover:bg-gray-800 flex-1 rounded-3xl`}>Both</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-grow items-end mb-4 justify-center">
                <Button variant='contained' endIcon={<HandshakeRoundedIcon />} onClick={onSubmit} className='bg-black hover:bg-yellow-800 rounded-2xl w-3/4'>Confirm</Button>
            </div>
        </div>

    )
}

export default EventView2