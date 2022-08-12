import React from 'react'
import { useState } from 'react';
import EventBuddyView from './EventBuddyView';
import EventView1 from './EventView1';
import EventView2 from './EventView2';

function EventView(props) {
    const { event, next, prev, step} = props;
    if(!event) return;

    const getEventViews = (step) => {
        switch (step) {
            case 0: return <EventView1 event={event} next={next} />
            case 1: return <EventView2 event={event} next={next} prev={prev} />
            case 2: return <EventBuddyView event={event} />
        }
    }
    return event.isinterested == 1? <EventBuddyView event={event}/> : (
        getEventViews(step)

    )
}

export default EventView