import { Button } from '@mui/material';
import React from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axios from 'axios';

function AdminEventCard(props) {
  const { event, ind, addEditEvents, refresh } = props;
  const start = (new Date(event.start_date.slice(0, 19)))
  const end = (new Date(event.end_date.slice(0, 19)))
  
  const deleteEvent = async () => {
    await axios.get(`http://localhost:2000/apis/manager/deleteevent/${event.id}`).then(() => refresh()).catch((e) => console.log(e))
  }
  return (
    <div className='w-full aspect-[4/1] rounded-3xl bg-yellow-100 p-6 flex'>
      <div className="flex flex-col w-1/3">
        <h1 className='text-2xl font-bold text-left'>{event.name}</h1>
        <h3 className='text-sm text-left'>Location : {event.location}</h3>
        <h3 className='text-sm text-left'>Start : {start.getDate() + " / " + start.getMonth()}</h3>
        <h3 className='text-sm text-left'>End : {end.getDate() + " / " + end.getMonth()}</h3>
        <h3 className='text-sm text-left'>Type : {event.type}</h3>
        <h3 className='text-sm text-left'>Theme : {event.theme}</h3>
      </div>
      <div className="flex flex-col gap-4 w-1/3">
        <div className="">
          <h3 className='text-sm text-left'>Interested Attendies</h3>
          <h1 className='text-6xl font-bold text-left'>{event.countinterested}</h1>
        </div>
        <div className="">
          <h3 className='text-sm text-left'>Confirmed Attendies</h3>
          <h1 className='text-6xl font-bold text-left'>{event.countconfirmed}</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center w-1/3  gap-10">
        <Button variant='contained' startIcon={<DeleteRoundedIcon/>} className="bg-red-600 rounded-3xl py-4" onClick={deleteEvent}>Delete Event</Button>
        <Button variant="contained" startIcon={<EditRoundedIcon/>} className="bg-gray-600 rounded-3xl py-4" onClick={()=>addEditEvents(event)}>Edit Event</Button>
      </div>
    </div>
  )
}

export default AdminEventCard