import { IconButton, Button, CardActionArea, TextField, InputAdornment } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands, light } from '@fortawesome/fontawesome-svg-core/import.macro'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { userContext } from '../../contexts/UserContext';
import { getDateString, getDuration, getEndDate } from '../funcs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';

function AdminSponsorPage() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [sponsors, setSponsors] = useState([])
  const [events, setEvents] = useState([])
  const [newSponsor, setNewSponsor] = useState({ eventid: "", type: "" });
  const managerID = useContext(userContext);
  const getData = require('../getData')
  useEffect(() => {
    getData.default(`http://localhost:2000/apis/manager/events/${managerID.username}`, setEvents)
    getData.default(`http://localhost:2000/apis/manager/offers/${managerID.username}`, setSponsors)
  }, []);

  const onSubmit = async () => {
    await axios.post(`http://localhost:2000/apis/manager/addoffer/${managerID.username}`, newSponsor).then(() => setStep(step + 1)).catch((e) => console.log(e))
  }

  const resetModal = () => {
    setNewSponsor({ type: "", eventid: "" });
    setStep(0);
    // refresh();
    setShowModal(false);
  }

  const getIcons = (promo, color) => {
    switch (promo) {
      case "Small Banner": return <FontAwesomeIcon className={`text-5xl ${color}`} icon={regular("square")} />
      case "Big Banner": return <FontAwesomeIcon className={`text-5xl ${color}`} icon={regular("rectangle-list")} />
      case "Event Top Result": return <FontAwesomeIcon className={`text-5xl ${color}`} icon={solid("jet-fighter-up")} />
    }
  }

  const promos = [
    { type: "Small Banner", cost: 500, description: "Small banner in the dashboard of the users. Perfect for promoting events with special offers and discounts." },
    { type: "Big Banner", cost: 1000, description: "Large banner in the dashboard of the users. Great for showing content or introducing new and exciting items. Good for special offers." },
    { type: "Event Top Result", cost: 250, description: "Places event in more searches. Creates more engagement for the event." }
  ]
  const getSteps = (step) => {
    switch (step) {
      case 0: return <AddSponsorStep1 step={step} setStep={setStep} getIcons={getIcons} promos={promos} newSponsor={newSponsor} setNewSponsor={setNewSponsor} />
      case 1: return <AddSponsorStep2 step={step} setStep={setStep} events={events} newSponsor={newSponsor} setNewSponsor={setNewSponsor} />
      case 2: return <AddSponsorStep3 step={step} setStep={setStep} promo={promos[0]} eve="Epic Ninja Fest" newSponsor={newSponsor} setNewSponsor={setNewSponsor} />
      case 3: return <AddSponsorStep4 step={step} setStep={setStep} promo={promos[1]} eve={events[0]} newSponsor={newSponsor} setNewSponsor={setNewSponsor} />
      case 4: return <AddSponsorStep5 step={step} setStep={setStep} newSponsor={newSponsor} onSubmit={onSubmit} />
      case 5: return <AddSponsorStep6 />
    }
  }
  return (
    <div className='h-screen w-full'>
      <div className="h-full w-full py-4 flex flex-col gap-4 pr-4">
        <h1 className='text-left text-3xl font-bold'>Your Events</h1>
        <div className="overflow-y-auto flex flex-col gap-4">

          {sponsors.map((sponsor, ind) => <AdminSponsorCard sponsor={sponsor} getIcons={getIcons} />)}
        </div>
      </div>
      <Button variant='contained' className='bg-black p-6 rounded-3xl fixed bottom-12 right-12' startIcon={<AddRounded />} onClick={() => setShowModal(true)}>Add New Promotion</Button>
      <div className={"fixed top-0 left-0 h-screen w-screen bg-opacity-60 bg-black flex justify-center items-center" + (showModal ? "" : " hidden")}>
        <div className="flex flex-col w-2/3 h-4/5 bg-yellow-400 rounded-3xl p-8">
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

export default AdminSponsorPage

const AddSponsorStep1 = ({ step, setStep, getIcons, promos, newSponsor, setNewSponsor }) => <div className='w-full flex flex-col justify-between basis-full '>
  <div className="h-full flex flex-col items-start gap-6">
    <h1 className='font-bold text-left text-3xl'>Promotion Type</h1>
    <div className="flex justify-center gap-4 items-center h-full w-full">
      {promos.map((promo, ind) => <CardActionArea className='h-full w-1/3' onClick={() => { setNewSponsor({ ...newSponsor, type: promo.type, cost: promo.cost }); setStep(step + 1) }}>
        <div className="p-8 flex flex-col justify-between h-full rounded-3xl hover:bg-yellow-800 bg-black gap-4">
          <div className="flex flex-col gap-8">

            {getIcons(promo.type, 'text-white')}
            <h1 className='text-left text-3xl text-white'>{promo.type}</h1>
            <p className='text-left text-sm font-light text-white'>{promo.description}</p>
          </div>
          <h3 className='text-left text-white'><span className='text-5xl'>৳{promo.cost}</span>/day</h3>
        </div>
      </CardActionArea>)}
    </div>
  </div>
</div>

const AddSponsorStep2 = ({ step, setStep, events, newSponsor, setNewSponsor }) => <div className='w-full  flex flex-col justify-between basis-full'>
  <div className="flex flex-col items-start h-96 gap-6">
    <h1 className='font-bold text-left text-3xl'>Select Desired Event For Promotion</h1>
    <div className="flex flex-col w-full gap-4   overflow-scroll">
      {events.map((eve, ind) => <CardActionArea onClick={() => { setNewSponsor({ ...newSponsor, eventid: eve.id, eventname: eve.name }); setStep(newSponsor.type === 'Event Top Result' ? step + 2 : step + 1) }} className='shadow-lg h-20 p-4 rounded-3xl'>{<h1 className='text-left font-medium'>{eve.name}</h1>}</CardActionArea>)}
    </div>

  </div>
  <div className="flex w-full justify-between">
    <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(step - 1)}>Back</Button>
    {/* <Button variant='contained' className='bg-black rounded-3xl' onClick={() => setStep(step + 1)}>Next</Button> */}
  </div>
</div>
const AddSponsorStep3 = ({ step, setStep, eve, newSponsor, setNewSponsor }) => {
  return (
    <div className='w-full flex flex-col justify-between basis-full'>
      <div className="flex flex-col items-start  gap-6">
        <h1 className='font-bold text-left text-3xl'>Edit Your Banner</h1>
        <div className="flex w-full gap-4">

          <div className="flex flex-col w-1/3 gap-6">
            <TextField
              label="Title"
              className=''
              value={newSponsor.title}
              onChange={(e) => setNewSponsor({ ...newSponsor, title: e.target.value })}
            />
            <TextField
              label="Banner Subtitle"
              className=''
              value={newSponsor.subtitle}
              onChange={(e) => setNewSponsor({ ...newSponsor, subtitle: e.target.value })}
            />
            {
              newSponsor.type === "Big Banner" ? (<TextField
                label="Image Link"
                className=''
                value={newSponsor.photo_link}
                onChange={(e) => setNewSponsor({ ...newSponsor, photo_link: e.target.value })}
              />
              )
                : <div />
            }
            {
              newSponsor.type === "Big Banner" ? (<LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date and Time"
                  value={newSponsor.end_date}
                  onChange={(newValue) => {
                    setNewSponsor({ ...newSponsor, end_date: newValue });
                  }}
                />
              </LocalizationProvider>
              )
                : <div />
            }
          </div>
          <div className="w-2/3 flex flex-col items-center gap-4">
            <p>This is how your banner is going to look like.</p>
            {newSponsor.type === "Big Banner" ? <BigBanner banner={newSponsor} /> : <SmallBanner banner={newSponsor} eve={eve} />}
          </div>
        </div>


      </div>
      <div className="flex w-full justify-between">
        <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(step - 1)}>Back</Button>
        <Button variant='contained' className='bg-black rounded-3xl' onClick={() => setStep(step + 1)}>Next</Button>
      </div>
    </div>
  )
}
const AddSponsorStep4 = ({ step, setStep, newSponsor, setNewSponsor }) => <div className='w-full flex flex-col justify-between basis-full gap-4'>
  <div className="flex flex-col items-start  gap-6">
    <h1 className='font-bold text-left text-3xl'>Cost</h1>
    <TextField
      label="Promotion Duration"
      className='w-2/3'
      InputProps={{
        endAdornment: <InputAdornment position="end">Days</InputAdornment>,
      }}
      value={newSponsor.duration}
      onChange={(e) => { setNewSponsor({ ...newSponsor, duration: e.target.value, promo_end_date: getEndDate(e.target.value) }) }}
    />
  </div>
  <div className="h-full flex flex-col items-start gap-3">

    <p className='text-xl font-bold'>You have chosen-</p>
    <div className="flex flex-col items-start">

      <p className='text-sm font-light'>Event Name</p>
      <h1 className='text-2xl font-bold'>{newSponsor.eventname}</h1>
    </div>
    <div className="flex flex-col items-start">

      <p className='text-sm font-light'>Promotion Type</p>
      <h1 className='text-2xl font-bold'>{newSponsor.type}</h1>
    </div>
    <div className="flex flex-col items-start">

      <p className='text-sm font-light'>Ends At</p>
      <h1 className='text-2xl font-bold'>{getDateString(newSponsor.promo_end_date)}</h1>
    </div>
    <div className="flex flex-col items-start">

      <p className='text-sm font-light'>Total Cost</p>
      <h1 className='text-2xl font-bold'>৳ {newSponsor.cost * newSponsor.duration}</h1>
    </div>
  </div>
  <div className="flex w-full justify-between">
    <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(newSponsor.type === "Event Top Result" ? step - 2 : step - 1)}>Back</Button>
    <Button variant='contained' className='bg-black rounded-3xl' onClick={() => setStep(step + 1)}>Proceed To Payment</Button>
  </div>
</div>

const AddSponsorStep5 = ({ step, setStep, newSponsor, onSubmit }) => <div className='w-full flex flex-col justify-between basis-full'>
  <div className="flex flex-col items-start  gap-6">
    <h1 className='font-bold text-left text-3xl'>Payment Information</h1>
    <TextField
      label="Card Number"
      className='w-2/3'

    />
    <TextField
      label="Cardholder Name"
      className='w-2/3'

    />
    <div className="w-2/3 flex gap-2">

      <TextField
        label="Expiry Month"
        className=''
        type="number"
      />
      <TextField
        label="Expiry Year"
        className=""
        type="number"
      />
      <TextField
        label="CCV"
        className=''
        type="number"
      />
    </div>

  </div>
  <div className="flex w-full justify-between">
    <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(step - 1)}>Back</Button>
    <Button variant='contained' className='bg-black rounded-3xl' onClick={onSubmit}>Proceed and Pay ৳{newSponsor.duration * newSponsor.cost}</Button>
  </div>
</div>

const AddSponsorStep6 = () => <div className='w-full flex flex-col items-center justify-center basis-full gap-6'>
  <h1 className='text-4xl font-extrabold'>Congratulations!</h1>
  <h3 className='text-xl font-bold'>Promotion Has Been Added.</h3>
</div>
const AdminSponsorCard = ({ sponsor, getIcons }) => <div className='flex gap-8 p-8 bg-yellow-200 rounded-3xl '>
  {getIcons(sponsor.type, 'text-black')}
  <div className="w-full flex justify-between items-center ">

    <h1 className='text-left text-3xl font-bold'>{sponsor.type}</h1>
    <h2 className=''>
      Ends at {getDateString(sponsor.promo_end_date)}
    </h2>
  </div>

</div>


const BigBanner = ({ banner }) => <div className='flex bg-gradient-to-tr from-lime-200 to-blue-200 rounded-3xl aspect-[16/7] w-full mb-1 p-6'>
  <div className="flex flex-col justify-between h-full w-1/2">
    <div className="">
      <h4 className='text-left font-bold text-3xl'>{banner.title}</h4>
      <p className='text-left font-extralight'>{banner.subtitle}</p>
    </div>
    <div className="flex gap-2 items-end justify-start">
      <AccessTimeRoundedIcon />
      <p>{getDuration(banner.end_date)} days left </p>
    </div>
  </div>
  <div className="flex justify-end w-1/2 ">
    <img className="h-full object-cover" src={banner.photo_link} alt="" />
  </div>
</div>

const SmallBanner = ({ banner }) => <div className='h-56 w-56 flex flex-col p-8 justify-between bg-gradient-to-bl from-fuchsia-800 to-blue-800  m-1 rounded-3xl'>
  <div className="text-white font-bold">

    <h2>{banner.eventname}</h2>
  </div>
  <div className="flex flex-col justify-center grow ">
    <h1 className='font-extrabold text-white text-5xl'>{banner.title}</h1>
    <p className='text-white text-lg'>{banner.subtitle}</p>
  </div>

</div>
