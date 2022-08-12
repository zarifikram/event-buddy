import React, { useState } from 'react'
import { Toolbar, ListItem, List } from "@mui/material";
import MyListButton from '../widgets/MyListButton';
import PageController2 from './PageController2';
import { userContext } from './../../contexts/UserContext';

function EventUserProfilePage({currentUser}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const onButtonClick = (value) => setCurrentIndex(value)
    return (
        <userContext.Provider value={currentUser}>

            <div className="flex">
                <div className="shrink-0 grow-0 w-25 h-screen bg-yellow-50">
                    <Toolbar>
                        <h1 className='text-3xl font-black '>Event Buddy</h1>
                    </Toolbar>

                    <List className='mt-8'>
                        <p className='text-left pl-8 my-2 font-bold text-xs'>Main Menu</p>
                        {['Dashboard', 'Events', 'Logistics', 'Offers'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <MyListButton text={text} index={index} currentIndex={currentIndex} onButtonClick={onButtonClick} />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <PageController2 currentIndex={currentIndex} />
            </div>
        </userContext.Provider>
    )
}

export default EventUserProfilePage