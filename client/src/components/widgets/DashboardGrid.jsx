import React from 'react'
import Activity from './Activity'
import EventOffers from './EventOffers'
import SuggestionsAndRequest from './SuggestionsAndRequest'

function DashboardGrid({goToEvents}) {
    return (
        <div className='h-2/3  flex mb-4 mr-4 '>
            <Activity/>
            <EventOffers goToEvents={goToEvents}/>
            <SuggestionsAndRequest/>
        </div>
    )
}

export default DashboardGrid