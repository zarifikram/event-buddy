import React, { useState } from 'react'
import EventIcon from '@mui/icons-material/Event';
import { Card, Typography, TextField, Box, Button, Divider } from "@mui/material"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function EventSigninPage({ setCurrentUser }) {
    const [signin, setSignin] = useState({ email: "", password: "" })
    const Navigate = useNavigate();

    const onSubmit = async () => {
        axios.get(`/apis/organizerauth/${signin.email}/${signin.password}`).then((res) => {
            if (res.data === "WRONG") { 
                alert("hoiloo na ");
                return;
            }
            else {
                setCurrentUser(res.data)
                Navigate("/eventUserProfile")
            }
        })
    }

    return (
        <div className='bg-yellow-50 h-screen w-screen flex'>
            <div className="w-full">
                <UserSigninStep1 signin={signin} setSignin={setSignin} onSubmit={onSubmit} />
            </div>
            <div class="bg-yellow-400 rounded-l-xl w-2/5 px-8 pt-8">
                <div class="flex items-start">
                    <EventIcon className="mr-2" />
                    <h2 class="font-black">Event Buddy</h2>
                </div>
                <h4 class="font-bold pt-24 w-72 text-2xl text-left">Sign in to get the best experience according to your own taste.</h4>
            </div>
        </div>
    )
}

export default EventSigninPage

const UserSigninStep1 = ({ signin, setSignin, onSubmit }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
    <h1 className='text-3xl font-extrabold w-full text-left'>Event Manager Sign In</h1>
    <div className="flex flex-col gap-4 w-2/3">
        <TextField
            label="Email"
            value={signin.email}
            onChange={(e) => setSignin({ ...signin, email: e.target.value })}
        />
        <TextField
            label="Password"
            type="password"
            value={signin.password}
            onChange={(e) => setSignin({ ...signin, password: e.target.value })}
        />
    </div>
    <div className="flex w-full">
        <Button variant='contained' className='bg-black w-48 h-16 rounded-3xl' onClick={onSubmit}>Sign In</Button>
    </div>
</div>