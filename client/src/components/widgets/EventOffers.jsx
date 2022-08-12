import { CircularProgress } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import BigBanner from './BigBanner'
import SmallBanner from './SmallBanner'

function EventOffers({goToEvents}) {
    const [smallBanners, setSmallBanners] = useState([]);
    const [bigBanners, setBigBanners] = useState([]);
    const getData = require('../getData')
    useEffect(() => {
        getData.default(`http://localhost:2000/apis/user/getbigbanner`, setBigBanners)
        getData.default(`http://localhost:2000/apis/user/getsmallbanner`, setSmallBanners)
    }, []);

    return (
        <div className='rounded-3xl w-1/2'>
            {
                bigBanners.length === 0 ? <CircularProgress /> :
                    <BigBanner bigBannerData={bigBanners[0]} goToEvents={goToEvents} />
            }
            {smallBanners.length < 2 ? <CircularProgress /> :
                <div className="flex mt-1 h-1/2 justify-between">
                    <SmallBanner bannerData={smallBanners[0]} goToEvents={goToEvents}/>
                    <SmallBanner bannerData={smallBanners[1]} goToEvents={goToEvents}/>
                </div>
            }
        </div>
    )
}

export default EventOffers