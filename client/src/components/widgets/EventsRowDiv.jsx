import React from 'react'
import EventCardSmall from './EventCardSmall';

function EventsRowDiv(props) {
    const {events, eventIndexStart, goToEvents } = props;
    const eventsNew = events.slice(eventIndexStart, eventIndexStart + 6);
    console.log(events);
  return (
    <div className='flex gap-x-3 justify-between grow h-full'>
        {eventsNew.map((eventObj, ind)=><EventCardSmall eventObj = {eventObj} goToEvents={goToEvents}/>)}
    </div>
  )
}

export default EventsRowDiv