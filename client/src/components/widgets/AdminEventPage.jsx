import { IconButton, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddEventStep1 from './AddEventStep1';
import AddEventStep2 from './AddEventStep2';
import AddEventStep3 from './AddEventStep3';
import AddEventStep4 from './AddEventStep4';
import AdminEventCard from './AdminEventCard';
import AddRounded from '@mui/icons-material/AddRounded';
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';

function AdminEventPage() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({});

  const manager = useContext(userContext);
  const getData = require('../getData')
  const refresh = () => {
    getData.default(`http://localhost:2000/apis/manager/events/${manager.username}`, setEvents)
  }

  
  useEffect(() => {refresh()} , []);
  const resetModal = () => {
    setNewEvent({});
    setStep(0);
    refresh();
    setShowModal(false);
  }

  const addEditEvents = (event = {}) => {
    setNewEvent(event);
    setShowModal(true);
  }

  const getSteps = (step) => {
    switch (step) {
      case 0: return <AddEventStep1 step={step} setStep={setStep} newEvent={newEvent} setNewEvent={setNewEvent} />
      case 1: return <AddEventStep2 step={step} setStep={setStep} newEvent={newEvent} setNewEvent={setNewEvent} />
      case 2: return <AddEventStep3 step={step} setStep={setStep} newEvent={newEvent} setNewEvent={setNewEvent} />
      case 3: return <AddEventStep4 />
    }
  }
  return (
    <div className='h-screen w-full'>
      <div className="h-full w-full py-4 flex flex-col gap-4 pr-4">
        <h1 className='text-left text-3xl font-bold'>Events</h1>

        <div className="overflow-y-auto flex flex-col gap-4">

          {events.map((event, ind) => <AdminEventCard event={event} ind={ind} addEditEvents={addEditEvents} refresh={refresh} />)}
        </div>
      </div>
      <Button variant='contained' className='bg-black p-6 rounded-3xl fixed bottom-12 right-12' startIcon={<AddRounded />} onClick={() => addEditEvents({})}>Create New Event</Button>
      <div className={"fixed top-0 left-0 h-screen w-screen bg-opacity-60 bg-black flex justify-center items-center" + (showModal ? "" : " hidden")}>
        <div className="flex flex-col w-1/2 h-4/5 bg-yellow-400 rounded-3xl p-8">
          <div className="flex justify-end w-full ">
            <IconButton onClick={resetModal}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
          {getSteps(step)}
        </div>
      </div>
    </div>
  )
}

export default AdminEventPage