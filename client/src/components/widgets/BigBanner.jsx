import React from 'react'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { getDuration } from '../funcs';
import { CardActionArea } from '@mui/material';

function BigBanner({ bigBannerData, goToEvents }) {

    return (
        <CardActionArea onClick={()=>goToEvents(bigBannerData.eventid)} className="h-1/2">
            <div className='flex bg-gradient-to-tr from-lime-200 to-blue-200 rounded-3xl h-full w-full mb-1 p-6'>
                <div className="flex flex-col justify-between h-full w-1/2">
                    <div className="">
                        <h4 className='text-left font-bold text-3xl'>{bigBannerData.title}</h4>
                        <p className='text-left font-extralight'>{bigBannerData.subtitle}</p>
                    </div>
                    <div className="flex gap-2 items-end justify-start">
                        <AccessTimeRoundedIcon />
                        <p>{getDuration(bigBannerData.end_date)} days left </p>
                    </div>
                </div>
                <div className="flex justify-end w-1/2 ">
                    <img className="h-full object-cover" src={bigBannerData.photo_link} alt="" />
                </div>
            </div>
        </CardActionArea>
    )
}

export default BigBanner