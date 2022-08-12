import React from 'react'
import DashboardGrid from '../widgets/DashboardGrid'
import EventViewRow from '../widgets/EventViewRow'

function DashboardPage({goToEvents}) {
  return (
    <div className='flex flex-col h-full py-2'>
      <EventViewRow goToEvents={goToEvents}/>
      <DashboardGrid goToEvents={goToEvents}/>
    </div>
  )
}

export default DashboardPage