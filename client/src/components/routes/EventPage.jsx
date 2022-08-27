import { CircularProgress } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react'
import EventCard from '../widgets/EventCard';
import EventView from '../widgets/EventView';
import SearchBar from '../widgets/SearchBar';
import axios from 'axios';
import { userContext } from '../../contexts/UserContext';
import { data } from 'autoprefixer';


function EventPage({ eventid }) {
    const [events, setEvents] = useState([]);
    const [step, setStep] = useState(0);

    const next = () => setStep(step + 1);
    const prev = () => setStep(step - 1);
    const user = useContext(userContext);
    const getData = require('../getData')
    useEffect(() => { getData.default(`/apis/user/events/${user.username}`, setEvents) }, []);
    const [topEvent, setTopEvent] = useState(null);
    useEffect(() => { getData.default(`/apis/user/events/topevent`, setTopEvent) }, []);
    
    useEffect(() => {
        const a = events.filter((d) => d.id === eventid);
        setSelectedEvent(a[0]);
    }, [events])
    const filterData = (searchQuery, data) => {

        if (!searchQuery) {
            return data;
        } else {
            return data.filter((d) => d.name.toLowerCase().includes(searchQuery));
        }
    }
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, events);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const onEventSelect = (event) => { setSelectedEvent(event); setStep(0); }
    console.log('here')
    console.log(topEvent)
    return (
        <div className='flex justify-between h-screen py-4 pr-4 gap-4'>
            <div className='flex flex-col  rounded-3xl p-4  bg-yellow-100 w-full'>
                <SearchBar setSearchQuery={setSearchQuery} />
                {/* {topEvent != null ? <EventCard onClick={onEventSelect} event={topEvent} /> : <div/>} */}
                {dataFiltered.length === 0 ? <div className='text-xl m-12'> Could not find any matching events. 😓</div> : <div className="flex flex-wrap justify-center grow-1 overflow-auto">
                    {dataFiltered.map((d) => <EventCard onClick={onEventSelect} event={d} />)}
                </div>}
            </div>
            <div className="shrink-0 bg-yellow-100  rounded-3xl w-1/3">
                <EventView event={selectedEvent} step={step} next={next} prev={prev} />
            </div>
        </div>
    )
}

export default EventPage