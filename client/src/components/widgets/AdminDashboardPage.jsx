import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { userContext } from '../../contexts/UserContext'
import getData from '../getData'

function AdminDashboardPage() {
  return (
    <div className='h-full w-full flex flex-col gap-4 py-4 pr-4'>
      <div className="h-1/3 w-full flex gap-4">
        <TotalInterested />
        <HighestInterested />
      </div>
      <div className="h-1/3 w-full flex gap-4">
        <HighestConfirmed />
        <TotalConfirmed />
      </div>
      <div className="h-1/3 w-full flex gap-4">
        <HighestCostingEvent />
        <SoonEndingPromtion />
      </div>
    </div>
  )
}

export default AdminDashboardPage

const HighestInterested = () => {
  const [data, setData] = useState([])
  const user = useContext(userContext);

  useEffect(() => { getData(`/apis/manager/maxconfirm/${user.username}`, setData) }, []);

  return (data.length === 0) ? <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">Data not found.</div> : <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">
    <div className="flex flex-col items-start w-1/2 gap-4">
      <p className='font-light'>Highest Grossing Event</p>
      <h1 className='font-semibold text-4xl text-left'>{data[0].name}</h1>
    </div>
    <div className="w-1/2 h-full flex justify-center items-center">
      <h1 className='font-bold text-7xl'>
        {data[0].count}
      </h1>
    </div>
  </div>
}

const HighestConfirmed = () => {
  const [data, setData] = useState([])
  const user = useContext(userContext);

  useEffect(() => { getData(`/apis/manager/maxinterest/${user.username}`, setData) }, []);

  return (data.length === 0) ? <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">Data not found.</div> : <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">
    <div className="flex flex-col items-start w-1/2 gap-4">
      <p className='font-light'>Highest Confirmed Event</p>
      <h1 className='font-semibold text-4xl text-left'>{data[0].name}</h1>
    </div>
    <div className="w-1/2 h-full flex justify-center items-center">
      <h1 className='font-bold text-7xl'>
        {data[0].count}
      </h1>
    </div>
  </div>
}

const TotalInterested = () => {
  const [data, setData] = useState([])
  const user = useContext(userContext);

  useEffect(() => { getData(`/apis/manager/totalinterest/${user.username}`, setData) }, []);

  return (data.length === 0) ? <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">Data not found.</div> : <div className="bg-yellow-100 h-full w-1/3 rounded-3xl p-4">
    <div className="flex flex-col items-start w-1/2 gap-4">
      <p className='font-light'>Total Interested</p>
      <h1 className='font-bold text-7xl text-left'>{data[0].count}</h1>
    </div>
  </div>
}

const TotalConfirmed = () => {
  const [data, setData] = useState([])
  const user = useContext(userContext);

  useEffect(() => { getData(`/apis/manager/totalconfirm/${user.username}`, setData) }, []);

  return (data.length === 0) ? <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">Data not found.</div> : <div className="bg-yellow-100 h-full w-1/3 rounded-3xl p-4">
    <div className="flex flex-col items-start w-1/2 gap-4">
      <p className='font-light'>Total Confirmed</p>
      <h1 className='font-bold text-7xl text-left'>{data[0].count}</h1>
    </div>
  </div>
}

const HighestCostingEvent = () => {
  const [data, setData] = useState([])
  const user = useContext(userContext);

  useEffect(() => { getData(`/apis/manager/maxcost/${user.username}`, setData) }, []);

  return (data.length === 0) ? <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">Data not found.</div> : <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">
    <div className="flex flex-col items-start w-1/2 gap-4">
      <p className='font-light'>Highest Costing Logistic</p>
      <h2>{data[0].type} for </h2>
      <h1 className='font-semibold text-4xl text-left'>{data[0].name}</h1>
    </div>
    <div className="w-1/2 h-full flex justify-center items-center">
      <h1 className='font-bold text-5xl'>
        ৳
        {data[0].count}
      </h1>
    </div>
  </div>
}

const SoonEndingPromtion = () => {
  const [data, setData] = useState([])
  const user = useContext(userContext);

  useEffect(() => { getData(`/apis/manager/endingsoon/${user.username}`, setData) }, []);

  return (data.length === 0) ? <div className="bg-yellow-100 h-full w-2/3 rounded-3xl p-4 flex h-full">Data not found.</div> : <div className="flex bg-yellow-100 h-full w-1/2 rounded-3xl p-4">
    <div className="flex flex-col items-start w-1/2 gap-4">
      <p className='font-light'>Promotion Ending Soon</p>
      <div className="">
        <p className='text-left font-light'>{data[0].type} For</p>
        <h1 className='font-semibold text-2xl text-left'>{data[0].name}</h1>
      </div>
    </div>
    <div className="w-1/2 h-full flex flex-col justify-center items-start">
      <p className='text-left'>Ends In</p>
      <h1 className='font-bold text-5xl text-left'>
        {data[0].end_date.days}<br /> Days
      </h1>
    </div>
  </div>
}
