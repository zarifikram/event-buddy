import React, { useContext } from 'react'
import { Button, CircularProgress, TextField } from "@mui/material"
import { useState } from 'react';
import { userContext } from './../../contexts/UserContext'
import axios from 'axios';
function AddEventStep3(props) {
    const { step, setStep, newEvent, setNewEvent } = props;
    const [rotate, setRotate] = useState(false);
    const manager = useContext(userContext);
    console.log(newEvent);
    const onSubmit = async () => {
        setRotate(true);
        if (newEvent.id != undefined) {
            await axios.post(`http://localhost:2000/apis/manager/updateevent/${manager.username}`, newEvent).then(() => setStep(step + 1)).catch((e) => console.log(e))
        }
        else {
            await axios.post(`http://localhost:2000/apis/manager/addevent/${manager.username}`, newEvent).then(() => setStep(step + 1)).catch((e) => console.log(e))
        }
    }
    return (
        <div className='w-full flex flex-col justify-between basis-full'>
            <div className="flex flex-col items-start  gap-6">
                <h1 className='font-bold text-left text-3xl'>Event Photo</h1>
                <div className="flex flex-col gap-4 w-2/3">
                    <TextField
                        label="Event Photo Link"
                        value={newEvent.photo_link}
                        onChange={(e) => setNewEvent({ ...newEvent, photo_link: e.target.value })}
                    />
                </div>
            </div>
            <div className="aspect-video w-2/3 rounded-2xl border border-black">
                <img className="h-full object-cover rounded-2xl" src={newEvent.photo_link} alt="" />
            </div>
            <div className="flex w-full justify-between">
                <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(step - 1)}>Back</Button>
                <Button variant='contained' className='bg-black rounded-3xl' onClick={onSubmit}>{rotate ? <CircularProgress /> : "Add Event"}</Button>
            </div>
        </div>
    )
}

export default AddEventStep3