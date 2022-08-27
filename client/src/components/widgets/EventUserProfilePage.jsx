import React, { useState } from 'react'
import { Toolbar, ListItem, List, ListItemButton } from "@mui/material";
import MyListButton from '../widgets/MyListButton';
import PageController2 from './PageController2';
import { userContext } from './../../contexts/UserContext';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';

function EventUserProfilePage({ currentUser }) {
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
                                <MyListButton2 text={text} index={index} currentIndex={currentIndex} onButtonClick={onButtonClick} />
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

function MyListButton2(props) {
    const { text, index, currentIndex, onButtonClick } = props;
    const selected = index === currentIndex

    const getIcon = (index, selected) => {
        switch (index) {
            case 0: return <DashboardRoundedIcon className={selected ? 'text-yellow-800' : "text-grey-700"} />;
            case 1: return <TheaterComedyRoundedIcon className={selected ? 'text-yellow-800' : 'text-grey-700'} />;
            case 2: return <AccountTreeIcon className={selected ? 'text-yellow-800' : "text-grey-700"} />;
            case 3: return <FeaturedVideoIcon className={selected ? 'text-yellow-800' : "text-grey-700"} />;
        }
    }

    return (
        <ListItemButton className={`px-4 mx-4 rounded-2xl + ${selected ? ' bg-yellow-400' : ""} `} onClick={() => onButtonClick(index)}>
            {getIcon(index, selected)}
            <h2 className='text-xl text-black ml-4'>{text}</h2>
        </ListItemButton>
    )
}