import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AddEventStep1(props) {
    const { step, setStep, newEvent, setNewEvent } = props;

    return (
        <div className='w-full flex flex-col justify-between basis-full'>
            <div className="flex flex-col items-start gap-6">
                <h1 className='font-bold text-left text-3xl'>Basic Information</h1>
                <TextField
                    label="Event Name"
                    className='w-2/3'
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
                <TextField
                    label="Event Address"
                    className='w-2/3'
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Date and Time"
                        value={newEvent.start_date}
                        onChange={(newValue) => {
                            setNewEvent({ ...newEvent, start_date: newValue });
                        }}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date and Time"
                        value={newEvent.end_date}
                        onChange={(newValue) => {
                            setNewEvent({ ...newEvent, end_date: newValue });
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="flex w-full justify-end">
                <Button variant='contained' className='bg-black rounded-3xl' onClick={() => setStep(step + 1)}>Next</Button>
            </div>
        </div>
    )
}

export default AddEventStep1