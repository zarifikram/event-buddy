import React from 'react'
import { Button, TextField } from "@mui/material"

function AddEventStep2(props) {
    const { step, setStep, newEvent, setNewEvent } = props;
    return (
        <div className='w-full flex flex-col justify-between basis-full'>
            <div className="flex flex-col items-start  gap-6">
                <h1 className='font-bold text-left text-3xl'>Event Style</h1>
                <TextField
                    label="Event Details"
                    className='w-2/3'
                    rows={3}
                    multiline
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <TextField
                    label="Event Theme"
                    className='w-2/3'
                    value={newEvent.theme}
                    onChange={(e) => setNewEvent({ ...newEvent, theme: e.target.value })}
                />
                <TextField
                    label="Event Type"
                    className='w-2/3'
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                />

            </div>
            <div className="flex w-full justify-between">
                <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(step - 1)}>Back</Button>
                <Button variant='contained' className='bg-black rounded-3xl' onClick={() => setStep(step + 1)}>Next</Button>
            </div>
        </div>
    )
}

export default AddEventStep2