import React, { useState } from 'react'
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';
import { Card, Typography, TextField, Box, Button, Divider } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function EventSignupPage() {
    const [step, setStep] = useState(0);
    const next = () => setStep(step < 1 ? step + 1 : step);
    const prev = () => setStep(step > 0 ? step - 1 : step);
    const [eventManager, setEventManager] = useState({ username: "", email: "", password: "" })
    const navigate = useNavigate();
    const onSubmit = async () => {
        await axios.post("/apis/organizer", eventManager).catch((e) => console.log(e))
        // Navigate("/eventUserProfile")
      }

    const getSteps = (step) => {
        switch (step) {
            case 0: return <EventSignupStep1 prev={prev} next={next} eventManager={eventManager} setEventManager={setEventManager} navigate={navigate} />
            case 1: return <EventSignupStep2 prev={prev} eventManager={eventManager} setEventManager={setEventManager} onSubmit={onSubmit} />
        }
    }
    return (
        <div className='bg-yellow-50 h-screen w-screen flex'>
            <div className="w-full">
                {getSteps(step)}
            </div>
            <div class="bg-yellow-400 rounded-l-xl w-2/5 px-8 pt-8">
                <div class="flex items-start">
                    <EventIcon className="mr-2" />
                    <h2 class="font-black">Event Buddy</h2>
                </div>
                <h4 class="font-bold pt-24 w-72 text-2xl text-left">A few clicks away from creating your account.</h4>
            </div>
        </div>
    )
}


export default EventSignupPage

const EventSignupStep1 = ({ prev, next, eventManager, setEventManager, navigate }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
    <h1 className='text-3xl font-extrabold w-full text-left'>Account Details</h1>
    <div className="flex flex-col gap-4 w-2/3">
        <TextField
            label="Email"
            value={eventManager.email}
            onChange={(e) => setEventManager({ ...eventManager, email: e.target.value })}
        />
        <TextField
            label="Username"
            value={eventManager.username}
            onChange={(e) => setEventManager({ ...eventManager, username: e.target.value })}
        />
        <TextField
            label="Password"
            value={eventManager.password}
            onChange={(e) => setEventManager({ ...eventManager, password: e.target.value })}
        />
        <TextField
            label="Confirm Password"
            value={eventManager.password2}
            onChange={(e) => setEventManager({ ...eventManager, password2: e.target.value })}
        />
        <TextField
            label="Company Name"
            value={eventManager.name}
            onChange={(e) => setEventManager({ ...eventManager, name: e.target.value })}
        />
        <TextField
            label="Contact Number"
            value={eventManager.phone}
            onChange={(e) => setEventManager({ ...eventManager, phone: e.target.value })}
        />

    </div>
    <div className="text-left">Already have an account ? <Button onClick={()=>navigate('/signinEvent')}> Sign in </Button></div>
    <div className="flex w-full">
        <Button variant='contained' className='bg-black w-48 h-16 rounded-3xl' onClick={next}>Next</Button>
    </div>

</div>

const EventSignupStep2 = ({ prev, eventManager, setEventManager, onSubmit }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
    <h1 className='text-3xl font-extrabold w-full text-left'>Profile Photo</h1>
    <div className="w-60 h-60 rounded-full border border-black">
        <img className="h-full object-cover rounded-full" src={eventManager.photo_link} alt="" />
    </div>
    <div className="flex flex-col gap-4 w-2/3">
        <TextField
            label="Profile Photo Link"
            value={eventManager.photo_link}
            onChange={(e) => setEventManager({ ...eventManager, photo_link: e.target.value })}
        />
    </div>
    <div className="flex w-full gap-4">
        <Button variant='text' className='text-black hover:bg-yellow-100 w-48 h-16 rounded-3xl' onClick={prev}>Previous</Button>
        <Button variant='contained' className='bg-black hover:bg-yellow-800 w-48 h-16 rounded-3xl' onClick={onSubmit}>Finish Sign Up</Button>
    </div>

</div>