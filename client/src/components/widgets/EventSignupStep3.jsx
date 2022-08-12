import React from 'react'
import { Button, TextField } from '@mui/material'
import {useNavigate} from "react-router-dom";

function EventSignupStep3(props) {
  const {prev, next} = props;
  const Navigate = useNavigate();
  return (
    <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
      <h1 className='text-3xl font-extrabold w-full text-left'>Contact Information</h1>
      <div className="flex flex-wrap gap-4 w-full">
        <TextField
          label="First Name"
          className='basis-1/3'
        />
        <TextField
          label="First Name"
          className='basis-1/3'
        />
        <TextField
          label="First Name"
          className='basis-1/3'
        />
        <TextField
          label="First Name"
          className='basis-1/3'
        />
      </div>
      <div className="flex w-full gap-4">
        <Button variant='text' className='text-black hover:bg-yellow-100 w-48 h-16 rounded-3xl' onClick={prev}>Previous</Button>
        <Button variant='contained' className='bg-black hover:bg-yellow-800 w-48 h-16 rounded-3xl' onClick={()=>Navigate("/eventUserProfile")}>Finish Sign Up</Button>
      </div>

    </div>
  )
}

export default EventSignupStep3