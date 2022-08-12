import { IconButton, Button, TextField, InputAdornment } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext'
import axios from 'axios';

function AdminLogisticsPage() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [logistics, setLogistics] = useState([])
  const [newLogistic, setNewLogistic] = useState({ type: "", eventid : "" })
  const managerID = useContext(userContext)
  const getData = require('../getData')
  const onSubmit = async () => {
    await axios.post(`http://localhost:2000/apis/manager/addLogistic/${managerID.username}`, newLogistic).then(() => setStep(step + 1)).catch((e) => console.log(e))
  }
  const resetModal = () => {
    setNewLogistic({type:"", eventid:""});
    setStep(0);
    // refresh();
    setShowModal(false);
  }
  useEffect(() => { getData.default(`http://localhost:2000/apis/manager/logistics/${managerID.username}`, setLogistics) }, []);

  const getIcons = (log) => {
    switch (log) {
      case "Venue": return <FontAwesomeIcon className="text-5xl" icon={solid("mountain-city")} />
      case "Catering": return <FontAwesomeIcon className="text-5xl" icon={solid("burger")} />
      case "Transportation": return <FontAwesomeIcon className="text-5xl" icon={solid("car")} />
      case "Merchandise": return <FontAwesomeIcon className="text-5xl" icon={solid("gifts")} />
      case "Presentation Technology": return <FontAwesomeIcon className="text-5xl" icon={solid("person-chalkboard")} />
    }
  }

  const getSteps = (step) => {
    switch (step) {
      case 0: return <AddLogisticsStep1 step={step} setStep={setStep} newLogistic={newLogistic} setNewLogistic={setNewLogistic} getIcons={getIcons} />
      case 1: return <AddLogisticsStep2 step={step} setStep={setStep} newLogistic={newLogistic} setNewLogistic={setNewLogistic} />
      case 2: return <AddLogisticsStep3 step={step} setStep={setStep} newLogistic={newLogistic} setNewLogistic={setNewLogistic} onSubmit={onSubmit} getData={getData} managerID={managerID} />
      case 3: return <AddLogisticsStep4 />

    }
  }
  return (
    <div className='h-screen w-full'>
      <div className="h-full w-full py-4 flex flex-col gap-4 pr-4">
        <h1 className='text-left text-3xl font-bold'>Your Events</h1>
        <div className="overflow-y-auto flex flex-col gap-4">

          {logistics.map((log, ind) => <AdminLogisticsCard logistic={log} ind={ind} getIcons={getIcons} />)}
        </div>
      </div>
      <Button variant='contained' className='bg-black p-6 rounded-3xl fixed bottom-12 right-12' startIcon={<AddRounded />} onClick={() => setShowModal(true)}>Add New Logistics</Button>
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

export default AdminLogisticsPage

const AddLogisticsStep1 = ({ step, setStep, newLogistic, setNewLogistic, getIcons }) => <div className='w-full flex flex-col justify-between basis-full'>
  <div className="h-full flex flex-col items-start gap-6">
    <h1 className='font-bold text-left text-3xl'>Logistics Type</h1>
    <div className="flex flex-wrap justify-center gap-4 items-center h-full">
      {["Venue", "Catering", "Transportation", "Merchandise", "Presentation Technology"].map((log, ind) => <Button variant='contained' className={`flex flex-col w-1/4 aspect-square rounded-3xl hover:bg-yellow-800 ${newLogistic.type === log ? "bg-yellow-800" : "bg-black"}`} onClick={() => { setNewLogistic({ ...newLogistic, type: log }) }}>
        {getIcons(log)}
        {log}
      </Button>)}
    </div>
    <div className="flex w-full justify-end">
      <Button variant='contained' className='bg-black rounded-3xl' onClick={() => setStep(step + 1)}>Next</Button>
    </div>
  </div>
</div>


const AddLogisticsStep2 = ({ step, setStep, newLogistic, setNewLogistic, onSubmit }) => <div className='w-full flex flex-col justify-between basis-full'>
  <div className="flex flex-col items-start gap-6">
    <h1 className='font-bold text-left text-3xl'>Basic Information</h1>
    <TextField
      label="Item Title"
      className='w-2/3'
      value={newLogistic.title}
      onChange={(e) => setNewLogistic({ ...newLogistic, title: e.target.value })}
    />
    <TextField
      label="Item Purpose"
      className='w-2/3'
      multiline
      rows={3}
      value={newLogistic.purpose}
      onChange={(e) => setNewLogistic({ ...newLogistic, purpose: e.target.value })}
    />
    <TextField
      label="Item Cost"
      className='w-2/3'
      type="number"
      InputProps={{
        startAdornment: <InputAdornment position="start">৳</InputAdornment>,
      }}
      value={newLogistic.price}
      onChange={(e) => setNewLogistic({ ...newLogistic, price: e.target.value })}
    />
    <TextField
      label="Amount Needed"
      className='w-2/3'
      type="number"
      value={newLogistic.amount}
      onChange={(e) => setNewLogistic({ ...newLogistic, amount: e.target.value })}
    />
  </div>
  <div className="flex w-full justify-between">
    <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(step - 1)}>Back</Button>
    <Button variant='contained' className='bg-black rounded-3xl' onClick={() => setStep(step + 1)}>Next</Button>
  </div>
</div>

const AddLogisticsStep3 = ({ step, setStep, newLogistic, setNewLogistic, onSubmit, getData, managerID }) => {
  const [events, setEvents] = useState([])
  useEffect(() => { getData.default(`http://localhost:2000/apis/manager/events/${managerID.username}`, setEvents) }, []);
  return (<div className='w-full h-full flex flex-col items-center justify-center basis-full gap-6'>
    <div className=' w-full overflow-scroll'>
      {events.map((eve, ind) => <Button onClick={()=>{setNewLogistic({...newLogistic, eventid:eve.id})}} className={`w-full mb-4 text-white rounded-3xl h-20 ${newLogistic.eventid===eve.id ? "bg-yellow-800":"bg-black"}`}>{eve.name}</Button>)}
    </div>
    <div className="flex w-full justify-between">
    <Button variant='text' className='text-black rounded-3xl' onClick={() => setStep(step - 1)}>Back</Button>
    <Button variant='contained' className='bg-black rounded-3xl' onClick={onSubmit}>Submit</Button>
  </div>
  </div>)
}

const AddLogisticsStep4 = () => <div className='w-full flex flex-col items-center justify-center basis-full gap-6'>
  <h1 className='text-4xl font-extrabold'>All Done!</h1>
  <h3 className='text-xl font-bold'>Items Has Been Added.</h3>
</div>


const AdminLogisticsCard = ({ logistic, ind, getIcons }) => <div className="w-full aspect-[4/1] rounded-3xl bg-yellow-100 p-6 flex items-center">
  {getIcons(logistic.type)}
  <div className="w-full h-full flex justify-between pl-4 items-center">
    <div className="w-1/2">
      <h1 className='text-left text-3xl font-extrabold'>{logistic.title}</h1>
      <p className='text-left text-sm font-light'>{logistic.purpose}</p>
    </div>
    <div className="flex flex-col h-full justify-center gap-8 w-1/2">
      <h1 className='text-right text-5xl font-extrabold'>৳ {logistic.price}</h1>
      <div className="">

        <p className="text-right text-sm font-light">Item Needed</p>
        <h1 className='text-right text-5xl font-extrabold'>{logistic.amount}</h1>
      </div>
    </div>
  </div>
</div>
