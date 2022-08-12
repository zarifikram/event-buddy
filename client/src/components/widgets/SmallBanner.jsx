import { CardActionArea } from '@mui/material';
import React from 'react'

function SmallBanner(props) {
    const { bannerData, goToEvents } = props;
    return (
        <CardActionArea onClick={()=>goToEvents(bannerData.eventid)} className="h-full">
            <div className='flex flex-col p-8 justify-between bg-gradient-to-bl from-fuchsia-800 to-blue-800 h-full mx-1 rounded-3xl'>
                <div className="text-white font-bold">

                    <h2>{bannerData.geteventname}</h2>
                </div>
                <div className="flex flex-col justify-center grow ">
                    <h1 className='font-extrabold text-white text-5xl'>{bannerData.title}</h1>
                    <p className='text-white text-lg'>{bannerData.subtitle}</p>
                </div>

            </div>
        </CardActionArea>
    )
}

export default SmallBanner