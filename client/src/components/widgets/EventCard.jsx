import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
function EventCard(props) {

    const { onClick, event, ad } = props;
    const start = (new Date(event.start_date.slice(0, 19)))
    const end = (new Date(event.end_date.slice(0, 19)))
    console.log(event);
    return (
        
        <CardActionArea className='mt-12 w-96 mx-12 max-w-96 rounded-2xl'>
            {ad ? <h1>Advertisement</h1> : <div/>}
            <Card className={`h-full rounded-2xl bg-yellow-400`} onClick={() => onClick(event)}>
                <CardMedia>
                    <img className="h-56 w-full object-cover" src={event.photo_link} alt="" />
                </CardMedia >
                <CardContent>
                    <p className='text-left font-light text-sm'>{start.toLocaleString()}</p>
                    <h5 className='text-left font-bold text-xl'>{event.name}</h5>
                    <div className="flex items-center">
                        <FmdGoodRoundedIcon className='font-light opacity-60 text-sm mr-2' />
                        <p className='text-left font-light text-sm'>{event.location}</p>
                    </div>


                </CardContent>
            </Card>
        </CardActionArea>
    )
}

export default EventCard