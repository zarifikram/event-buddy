import React from 'react'
// import { Link } from "react-router-dom"
import { Box, Card, Typography, Divider, Button, Container } from "@mui/material";
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import pic from "../../assets/landingPic.png"
import frineds from "../../assets/frineds.png"
import interest from "../../assets/interest.png"
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import SavedSearchRoundedIcon from '@mui/icons-material/SavedSearchRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from 'react-router-dom';

function Links() {
    const Navigate = useNavigate();
    const style = "font-medium text-lg text-left hover:border-b-2 border-black cursor-pointer"
    const h1Style = " sm:text-5xl text-3xl font-extrabold w-80";
    const pStyle = "font-thin mt-8 w-80";
    const iconStyle = "sm:text-9xl text-6xl";
    const buttStyle = "bg-black rounded-3xl w-full hover:bg-yellow-800"
    return (
        <div className="">
            <div className="p-4 flex  justify-between h-16 border- bg-yellow-400 fixed top-0 w-screen">
                <h2 className=' font-black text-2xl text-left '>Event Buddy</h2>
                <div className="flex sm:flex-row flex-col gap-10 sm:bg-inherit bg-yellow-100 h-fit">
                    <Link
                        to="1"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <h1 className={style}>About</h1>
                    </Link>

                    <Link
                        to="2"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <h3 className={style}>Discover</h3>
                    </Link>

                    <Link
                        to="3"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <h3 className={style}>Services</h3>
                    </Link>

                    <Link
                        to="4"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        <h3 className={style}>How It Works</h3>
                    </Link>

                </div>
            </div>
            <div className="flex py-20 bg-yellow-400 h-screen flex-col sm:flex-row" id="1">
                <div className="h-full sm:w-2/5 p-8 flex gap-10 justify-center flex-col">
                    <h1 className='sm:text-7xl text-5xl text-left'>Your Taste in Event is Rare</h1>
                    <hr className='border-black border-[1.5px]' />
                    <h5 className="text-3xl text-left">Find the people that cherish your taste in events as much as you do, or more.</h5>
                    <Link
                        to="5"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >

                        <Button variant='contained' size="large" className='w-full text-lg bg-black hover:bg-yellow-800 text-white rounded-3xl'>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="sm:flex hidden justify-end w-3/5 p-8">
                    <img src={pic} alt="" className='h-full' />
                </div>
            </div>
            <div className="h-screen flex gap-20 bg-yellow-50" id="2">
                <div className="sm:w-1/2 py-12 sm:pl-36 flex flex-col sm:items-end justify-center w-full items-center">
                    <h1 className={h1Style + " sm:text-right"}>Finding Like-minded Friends Should Be Easy.</h1>
                    <p className={pStyle + " sm:text-right"}>You deserve to find friends that share the same interest as you, no matter how unpopular or weird it is. Event-buddy helps you re-discover your taste, because two is better than one.</p>
                </div>
                <div className="w-1/2 py-32 hidden sm:flex sm:items-start">
                    <img src={frineds} className="h-full cover" alt="" />
                </div>
            </div>
            <div className="h-screen flex gap-20 bg-yellow-50" id="3">
                <div className="w-1/2 py-32 sm:flex hidden flex-col justify-center  sm:items-end">
                    <img src={interest} alt="" className='w-5/6 ' />
                </div>
                <div className="sm:w-1/2 py-12 sm:pr-36 flex flex-col sm:items-start w-full items-center justify-center">
                    <h1 className={h1Style + " sm:text-left"}>All Your Event Going, Simplified</h1>
                    <p className={pStyle + " sm:text-left"}>How many times can you think of wanting to go to a place, wanting to do something, but never end up doing because nobody you know shares the same joy as you? Us. We understand your pain. Event-buddy takes care of everything, so that you can focus on your interests.</p>
                </div>
            </div>
            <div className="h-screen flex flex-col sm:gap-20 bg-yellow-400 py-20 justify-center" id="4">
                <div className="">
                    <h3 className="text-5xl font-extrabold">How It Works</h3>
                    <p className='font-extralight mt-8 '>We love accessibility. That's why Event-Buddy is easy to use.</p>
                </div>
                <div className="flex sm:flex-row flex-col justify-around ">
                    <div className="sm:w-1/6">
                        <InputRoundedIcon className={iconStyle} />
                        <h2 className="text-2xl font-bold sm:my-6">Information</h2>
                        <p className='font-extralight text-sm'>Enter your information and preference so that we can suggest events and event-buddies to you. It will be stored in a secured database.</p>
                    </div>
                    <div className="sm:w-1/6">
                        <SavedSearchRoundedIcon className={iconStyle} />
                        <h2 className="text-2xl font-bold sm:my-6">Search</h2>
                        <p className='font-extralight text-sm'>Search for events, and if any event is suitable for you, enter your gender and time preference.</p>
                    </div>
                    <div className="sm:w-1/6">
                        <PersonAddAltRoundedIcon className={iconStyle} />
                        <h2 className="text-2xl font-bold sm:my-6">Match</h2>
                        <p className='font-extralight text-sm'>Based on your event choice, request event-buddies to other like-minded people or accept event-buddy requests. Talk to each other and enjoy your event!</p>
                    </div>
                </div>
            </div>
            <div className="h-screen flex flex-col sm:gap-20 bg-yellow-50 pt-10 sm:pb-32 justify-center" id="5">
                <div className="">
                    <h3 className="text-5xl font-extrabold">Get Started</h3>
                    <p className='font-extralight text-3xl mt-8 '>Are you an?</p>
                </div>
                <div className="flex sm:flex-row flex-col justify-center gap-10 h-full">
                    <div className="sm:w-1/4 bg-yellow-200 p-10 flex flex-col justify-between items-center rounded-3xl">
                        <h2 className="text-3xl font-extrabold">
                            Event Goer
                        </h2>
                        <p className='font-thin w-2/3'>You need buddies to take part in events you would not normally visit alone.</p>
                        <Button variant='contained' className={buttStyle} onClick={()=>Navigate("/signup")}>Get Started</Button>
                    </div>
                    <div className="sm:w-1/4 bg-yellow-200 p-10  flex flex-col justify-between items-center rounded-3xl">
                        <h2 className="text-3xl font-bold">
                            Event Manager
                        </h2>
                        <p className='font-thin w-2/3'>You manage events, maintain the logistics and branding of your event.</p>
                        <Button variant='contained' className={buttStyle} onClick={()=>Navigate("/signupEvent")}> Get Started</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Links