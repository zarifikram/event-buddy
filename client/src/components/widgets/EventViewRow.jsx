import React, { useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import EventsRowDiv from './EventsRowDiv';
import { CardActionArea, Icon, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';

function EventViewRow({ goToEvents }) {
    const [events, setEvents] = useState([]);
    const [eventIndexStart, setEventIndexStart] = useState(0);

    const left = () => setEventIndexStart(eventIndexStart <= 0 ? 0 : eventIndexStart - 1)
    const right = () => setEventIndexStart(eventIndexStart + 6 >= events.length ? eventIndexStart : eventIndexStart + 1)
    const user = useContext(userContext);
    const getData = require('../getData')
    useEffect(() => {
        getData.default(`http://localhost:2000/apis/user/events/${user.username}`, setEvents);
    }, []);
    return (
        <div className='py-2 pr-4 h-1/3'>
            <div className="flex items-center bg-yellow-100 h-full rounded-3xl">
                <IconButton className='relative left-5 bg-white shadow-lg' onClick={left}>
                    <ArrowBackRoundedIcon className='' />

                </IconButton>
                <EventsRowDiv events={events} eventIndexStart={eventIndexStart} goToEvents={goToEvents} />
                <IconButton className='relative right-5 bg-white shadow-lg' onClick={right}>

                    <ArrowForwardRoundedIcon className='' />
                </IconButton>
            </div>
        </div>
    )
}

export default EventViewRow