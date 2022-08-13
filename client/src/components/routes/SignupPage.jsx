import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Typography, TextField, Box, Button, Divider } from "@mui/material"
import { spacing } from "@mui/system";
import EventIcon from '@mui/icons-material/Event';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, light } from '@fortawesome/fontawesome-svg-core/import.macro'
import axios, { Axios } from 'axios';
import FileBase64 from 'react-file-base64';
import { PickerOverlay } from 'filestack-react';

function SignupPage({ setCurrentUser }) {
  const Navigate = useNavigate();
  const [step, setStep] = useState(0);
  const next = () => setStep(step < 4 ? step + 1 : step);
  const prev = () => setStep(step > 0 ? step - 1 : step);
  const [eventBuddy, setEventBuddy] = useState({ type1: "", type2: "", type3: "" })

  const isTypeSelected = (type) => eventBuddy.type1 === type || eventBuddy.type2 === type || eventBuddy.type3 === type;
  const onTypeClick = (t) => {
    if (isTypeSelected(t)) {
      if (eventBuddy.type1 == t) setEventBuddy({ ...eventBuddy, type1: "" })
      else if (eventBuddy.type2 == t) setEventBuddy({ ...eventBuddy, type2: "" })
      else if (eventBuddy.type3 == t) setEventBuddy({ ...eventBuddy, type3: "" })
      return;
    }
    if (eventBuddy.type1 === "") setEventBuddy({ ...eventBuddy, type1: t })
    else if (eventBuddy.type2 === "") setEventBuddy({ ...eventBuddy, type2: t })
    else if (eventBuddy.type3 === "") setEventBuddy({ ...eventBuddy, type3: t })
    else setEventBuddy({ ...eventBuddy, type1: t })
  }
  const afterFile = (e) => {
    const files = e.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    var k;
    reader.onload = () => {
      // console.log(reader.result)
      k = (reader.result); //base64encoded string
    };

    const tr = URL.createObjectURL(files[0]);
    setEventBuddy({ ...eventBuddy, photo: tr, photoobj: files[0], photo64: k })
  }
  const onSubmit = async () => {

    await axios.post("/apis/user", eventBuddy).then((e)=>Navigate("/userprofile")).catch((e) => console.log(e))

  }
  useEffect(() => {
    if (eventBuddy.photo !== undefined) {
      let body = new FormData()
      body.set('key', 'f8dc2e55365fd6e12d7304b90d6f2671')
      body.append('image', eventBuddy.photo)
      // form.append('image', eventBuddy.photoobj)
      // console.log(form);
      // await axios.post(`https://api.imgbb.com/1/upload?key=f8dc2e55365fd6e12d7304b90d6f2671`, form).then((r) => console.log(r))
      // axios.post("/apis/img/getlink", form).then((e)=>console.log(e)) 
      console.log("ihihi" + eventBuddy.photo64)
      axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
      }).then((e) => console.log(e))
    }
  }, [eventBuddy.photo])
  const types = require('../../assets/types.json')


  const getSteps = (step) => {
    switch (step) {
      case 0: return <UserSignupStep1 prev={prev} next={next} eventBuddy={eventBuddy} setEventBuddy={setEventBuddy} navigate={Navigate} />
      case 1: return <UserSignupStep2 prev={prev} next={next} eventBuddy={eventBuddy} setEventBuddy={setEventBuddy} />
      case 2: return <UserSignupStep3 prev={prev} next={next} eventBuddy={eventBuddy} setEventBuddy={setEventBuddy} />
      case 3: return <UserSignupStep4 prev={prev} next={next} eventBuddy={eventBuddy} setEventBuddy={setEventBuddy} afterFile={afterFile} />
      case 4: return <UserSignupStep5 prev={prev} types={types.type} isTypeSelected={isTypeSelected} onTypeClick={onTypeClick} onSubmit={onSubmit} />
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

export default SignupPage

const UserSignupStep1 = ({ prev, next, eventBuddy, setEventBuddy, navigate }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
  <h1 className='text-3xl font-extrabold w-full text-left'>Account Details</h1>
  <div className="flex flex-col gap-4 w-2/3">
    <TextField
      label="Email"
      value={eventBuddy.email}
      onChange={(e) => setEventBuddy({ ...eventBuddy, email: e.target.value })}
    />
    <TextField
      label="Username"
      value={eventBuddy.username}
      onChange={(e) => setEventBuddy({ ...eventBuddy, username: e.target.value })}
    />
    <TextField
      label="Password"
      value={eventBuddy.password}
      onChange={(e) => setEventBuddy({ ...eventBuddy, password: e.target.value })}
    />
    <TextField
      label="Confirm Password"
      value={eventBuddy.password2}
      onChange={(e) => setEventBuddy({ ...eventBuddy, password2: e.target.value })}
    />
    <div className="flex gap-4">
      <TextField
        label="First Name"
        className='w-full'
        value={eventBuddy.first_name}
        onChange={(e) => setEventBuddy({ ...eventBuddy, first_name: e.target.value })}
      />
      <TextField
        label="Last Name"
        className='w-full'
        value={eventBuddy.last_name}
        onChange={(e) => setEventBuddy({ ...eventBuddy, last_name: e.target.value })}
      />
    </div>
    <div className="text-left">Already have an account ? <Button onClick={() => navigate('/signin')}> Sign in </Button></div>
  </div>
  <div className="flex w-full">
    <Button variant='contained' className='bg-black w-48 h-16 rounded-3xl' onClick={next}>Next</Button>
  </div>

</div>

const UserSignupStep2 = ({ prev, next, eventBuddy, setEventBuddy }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
  <h1 className='text-3xl font-extrabold w-full text-left'>Address & Date of Birth</h1>
  <div className="flex flex-col gap-4 w-2/3">
    <TextField
      label="Adress"
      rows={3}
      multiline
      value={eventBuddy.address}
      onChange={(e) => setEventBuddy({ ...eventBuddy, address: e.target.value })}
    />
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        label="Date of Birth"
        value={eventBuddy.dob}
        onChange={(e) => setEventBuddy({ ...eventBuddy, dob: e })}
      />
    </LocalizationProvider>
    {eventBuddy.dob != undefined ? <h1 className='text-2xl text-left'>You are {Math.floor((new Date() - eventBuddy.dob) / 31536000000)} years old.</h1> : <div />}
  </div>
  <div className="flex w-full gap-4">
    <Button variant='text' className='text-black hover:bg-yellow-100 w-48 h-16 rounded-3xl' onClick={prev}>Previous</Button>
    <Button variant='contained' className='bg-black hover:bg-yellow-800 w-48 h-16 rounded-3xl' onClick={next}>Next</Button>
  </div>

</div>
const UserSignupStep3 = ({ prev, next, eventBuddy, setEventBuddy }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
  <h1 className='text-3xl font-extrabold w-full text-left'>Personal Information</h1>
  <div className="flex flex-col gap-4 w-2/3">
    <TextField
      label="Occupation"
      value={eventBuddy.occupation}
      onChange={(e) => setEventBuddy({ ...eventBuddy, occupation: e.target.value })}
    />
    <div className="">
      <p className='text-left mb-4 font-light'>Gender</p>
      <div className="flex gap-10">
        <Button variant='contained' className={`${eventBuddy.gender === "male" ? "bg-yellow-400 shadow-none" : "bg-yellow-100"} rounded-3xl px-12 py-8`} onClick={() => { setEventBuddy({ ...eventBuddy, gender: "male" }) }}>
          <FontAwesomeIcon className="text-8xl text-black" icon={solid("mars")} />
        </Button>
        <Button variant='contained' className={`${eventBuddy.gender === "female" ? "bg-yellow-400 shadow-none" : "bg-yellow-100"} rounded-3xl px-12 py-8`} onClick={() => { setEventBuddy({ ...eventBuddy, gender: "female" }) }}>
          <FontAwesomeIcon className="text-8xl text-black" icon={solid("venus")} />
        </Button>
      </div>
    </div>
  </div>
  <div className="flex w-full gap-4">
    <Button variant='text' className='text-black hover:bg-yellow-100 w-48 h-16 rounded-3xl' onClick={prev}>Previous</Button>
    <Button variant='contained' className='bg-black hover:bg-yellow-800 w-48 h-16 rounded-3xl' onClick={next}>Next</Button>
  </div>

</div>
const UserSignupStep4 = ({ prev, next, eventBuddy, setEventBuddy, afterFile }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
  <h1 className='text-3xl font-extrabold w-full text-left'>Profile Photo</h1>
  <div className="w-60 h-60 rounded-full border border-black">
    <img className="h-full object-cover rounded-full" src={eventBuddy.photo_link} alt="" />
  </div>
  <div className="flex flex-col gap-4 w-2/3">
    <TextField
      label="Profile Photo Link"
      value={eventBuddy.photo_link}
      onChange={(e) => setEventBuddy({ ...eventBuddy, photo_link: e.target.value })}
    />
  </div>
  {/* <div className="h-40 bg-red-200 w-full">
  </div> */}
  <div className="flex w-full gap-4">
    <Button variant='text' className='text-black hover:bg-yellow-100 w-48 h-16 rounded-3xl' onClick={prev}>Previous</Button>
    <Button variant='contained' className='bg-black hover:bg-yellow-800 w-48 h-16 rounded-3xl' onClick={next}>Next</Button>
  </div>

</div>

const UserSignupStep5 = ({ prev, types, isTypeSelected, onTypeClick, onSubmit }) => <div className='flex flex-col h-full justify-center px-12 w-full gap-10'>
  <h1 className='text-3xl font-extrabold w-full text-left'>Select 3 Types That Match You The Best</h1>
  <div className="flex justify-center flex-wrap gap-4 w-full">
    {types.map((t, ind) => <Button className={`${isTypeSelected(t) ? "bg-black text-white" : ""}`} onClick={() => onTypeClick(t)}>{t}</Button>)}
  </div>
  <div className="flex w-full gap-4">
    <Button variant='text' className='text-black hover:bg-yellow-100 w-48 h-16 rounded-3xl' onClick={prev}>Previous</Button>
    <Button variant='contained' className='bg-black hover:bg-yellow-800 w-48 h-16 rounded-3xl' onClick={onSubmit}>Finish Sign Up</Button>
  </div>

</div>