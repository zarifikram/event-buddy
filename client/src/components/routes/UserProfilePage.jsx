import React, { useState } from 'react'
import { Drawer, List, ListItemText, ListItemButton, ListItem, ListItemIcon, Toolbar, Typography, ListSubheader, CardActionArea, IconButton, TextField, Button } from '@mui/material';
import MyListButton from '../widgets/MyListButton';
import PageController from '../widgets/PageController';
import { userContext } from "../../contexts/UserContext"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect } from 'react';
import getData from '../getData';
import axios from 'axios';

function UserProfilePage(props) {
  const { currentUser } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [eventid, setEventid] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(currentUser);
  const goToEvents = (id) => { setEventid(id); setCurrentIndex(1); }
  const onButtonClick = (value) => setCurrentIndex(value)
  const [success, setSuccess] = useState(false);
  const resetModal = () => {
    setShowModal(false);
    setSuccess(false);
  }
  const showModalFunc = () => {
    getData(`/apis/user/getuser/${currentUser.username}`, setUser);
    setShowModal(true);
  }
  return (
    <userContext.Provider value={user}>
      <div className="flex h-screen">
        <div className="flex flex-col shrink-0 grow-0 w-25 h-full bg-yellow-50 justify-between py-4">
          <div className="">

            <Toolbar className='h-20'>
              <h1 className='text-3xl font-black '>Event Buddy</h1>
            </Toolbar>

            <List className='flex flex-col justify-around mt-8'>

              <p className='text-left pl-8 my-2 font-bold text-xs'>Main Menu</p>
              {['Dashboard', 'Events', 'Messages', 'Chat Requests'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <MyListButton text={text} index={index} currentIndex={currentIndex} onButtonClick={onButtonClick} />
                </ListItem>
              ))}
            </List>
          </div>
          <CardActionArea className="px-2 rounded-3xl" onClick={showModalFunc}>
            <div className="bg-yellow-200  rounded-3xl flex items-center gap-4 p-2">
              <img src={user.photo_link} className="aspect-square w-10 rounded-full" />
              <h2>{user.first_name} {user.last_name}</h2>
            </div>
          </CardActionArea>
        </div>
        <PageController currentIndex={currentIndex} goToEvents={goToEvents} eventid={eventid} />
        <div className={"fixed top-0 left-0 h-screen w-screen bg-opacity-60 bg-black flex justify-center items-center" + (showModal ? "" : " hidden")}>
          <div className="flex flex-col w-2/3 h-4/5 bg-yellow-400 rounded-3xl p-8">
            <div className="flex justify-end w-full ">
              <IconButton onClick={resetModal}>
                <CloseRoundedIcon />
              </IconButton>
            </div>
            <UserProfileEdit user={user} setUser = {setUser} success={success} setSuccess={setSuccess} />
          </div>
        </div>
      </div>
    </userContext.Provider>
  )
}

export default UserProfilePage

const UserProfileEdit = ({ user, setUser, success, setSuccess }) => {


  const saveInfo = () => {
    axios.post(`/apis/user/edituser`, user).then(() => setSuccess(true)).catch((e) => console.log(e))  
  }

  return (user === null) ? <div /> : success ? <h1 className='h-full text-center text-3xl font-bold'>Infomation Saved!</h1> : <div className='w-full flex flex-col justify-between basis-full h-full pb-4'>
    <div className="flex flex-col items-start gap-6 h-full overflow-auto">
      <h1 className='font-bold text-left text-3xl'>Update Information</h1>
      <img src={user.photo_link} className = "rounded-full aspect-square w-56"alt="" />
      <TextField
        label="First Name"
        className='w-2/3'
        value={user.first_name}
        onChange={(e) => {setUser({...user, first_name:e.target.value})}}
      />
      <TextField
        label="Last Name"
        className='w-2/3'
        value={user.last_name}
        onChange={(e) => {setUser({...user, last_name:e.target.value})}}
      />
      <TextField
        label="Photo Link"
        className='w-2/3'
        value={user.photo_link}
        onChange={(e) => {setUser({...user, photo_link:e.target.value})}}
      />
      <TextField
        label="Address"
        className='w-2/3'
        value={user.address}
        onChange={(e) => {setUser({...user, address:e.target.value})}}
      />
      <TextField
        label="Occupation"
        className='w-2/3'
        value={user.occupation}
        onChange={(e) => {setUser({...user, occupation:e.target.value})}}
      />
      
    </div> 
    <div className="flex w-full justify-end">
      <Button variant='contained' className='bg-black rounded-3xl' onClick={saveInfo}>Save Information</Button>
    </div>
  </div>
}