import React, { useState } from 'react'
import { Drawer, List, ListItemText, ListItemButton, ListItem, ListItemIcon, Toolbar, Typography, ListSubheader } from '@mui/material';
import MyListButton from '../widgets/MyListButton';
import PageController from '../widgets/PageController';
import { userContext } from "../../contexts/UserContext"

function UserProfilePage(props) {
  const { currentUser } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [eventid, setEventid] = useState(null);
  const goToEvents = (id) => {setEventid(id); setCurrentIndex(1);}

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
            {['Dashboard', 'Events', 'Messages', 'Chat Requests'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <MyListButton text={text} index={index} currentIndex={currentIndex} onButtonClick={onButtonClick} />
              </ListItem>
            ))}
          </List>
        </div>
        <PageController currentIndex={currentIndex} goToEvents = {goToEvents} eventid = {eventid}/>
      </div>
    </userContext.Provider>
  )
}

export default UserProfilePage