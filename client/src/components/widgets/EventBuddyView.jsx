import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, IconButton , Button} from "@mui/material"
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import getData from '../getData';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';

function EventBuddyView(props) {
    const { event } = props;



    const [eventBuddies, setEventBuddies] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const user = useContext(userContext);
    const next = () => setSelectedIndex(selectedIndex < eventBuddies.length - 1 ? selectedIndex + 1 : selectedIndex)
    const prev = () => setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : selectedIndex)
    const requestChat = (to) => axios.get(`http://localhost:2000/apis/user/request/${user.username}/${to}/${event.id}`)
    useEffect(() => { getData(`http://localhost:2000/apis/user/matches/${user.username}/${event.id}`, setEventBuddies) }, []);
    const start = (new Date(event.start_date.slice(0, 19)))
    const end = (new Date(event.end_date.slice(0, 19)))

    const eventBuddy = eventBuddies[selectedIndex];
    const getAge = (dob) => Math.round((new Date() - new Date(dob)) / (356 * 3600 * 24000))
    return (
        eventBuddies.length == 0 ? <div className='flex h-full items-center px-4 text-xl'>There are no eventBuddies we were able to find. Please try again later. 😿</div>  :
            <div className="flex bg-yellow-400 h-full rounded-3xl items-center">

                <div className="">
                    <IconButton onClick={prev}>
                        <ChevronLeftRoundedIcon />
                    </IconButton>
                </div>
                <div className="flex flex-col flex-grow h-full">
                    <div className="mt-4">
                        <img className="h-80 w-full object-cover rounded-t-3xl rounded-b-3xl" src={(eventBuddy.photo_link)} alt="" />
                    </div>
                    <div className="shadow-lg bg-black rounded-3xl mt-4 p-4">
                        <h1 className='text-left text-white font-bold text-xl'>{eventBuddy.first_name + " " + eventBuddy.last_name + ", " + getAge(eventBuddy.dob)}</h1>
                        <p className='text-left text-white font-light text-sm'>{eventBuddy.gender}</p>
                        <p className='text-left text-white font-light text-sm'>{eventBuddy.occupation}</p>
                        <p className='text-left text-white font-light text-sm'>From {start.toDateString()}<br/> To {end.toDateString()}</p>
                    </div>
                    <div className="flex items-end flex-grow justify-center mb-4">
                    <Button variant='contained' endIcon={<FavoriteRoundedIcon />} onClick={()=>requestChat(eventBuddy.username)} className='bg-black rounded-2xl w-full'> Request Chat</Button>
                    </div>
                </div>
                <div className="">
                    <IconButton onClick={next}>
                        <ChevronRightRoundedIcon />
                    </IconButton>

                </div>
            </div>
    )
}

export default EventBuddyView