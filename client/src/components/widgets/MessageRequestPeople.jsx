import React from 'react'

function MessageRequestPeople(props) {
    const { recepient } = props;
    const getAge = (dob) => Math.round((new Date() - new Date(dob)) / (356 * 3600 * 24000))
    const start = (new Date(recepient.start_time.slice(0, 19)))
    const end = (new Date(recepient.end_time.slice(0, 19)))
    return (
        <div className='flex flex-col my-4 ml-4 w-1/2'>
            <div className="">
                <img className="w-full aspect-square rounded-3xl " src={(recepient.photo_link)} alt="" />
            </div>
            <div className="flex-grow ">
                <h5 className='font-bold text-2xl text-left mt-4'>{recepient.first_name} {recepient.last_name}, {getAge(recepient.dob)}</h5>
                <p className='text-left font-thin mb-4'>{recepient.address}</p>
                <p className='text-left font-thin mb-4'>{start.toDateString()}</p>
                <p className='text-left font-thin mb-4'>{end.toDateString()}</p>
            </div>
            <div className="bg-opacity-10 bg-black rounded-3xl px-4 py-4">
                <h1 className='text-black text-2xl font-bold'>
                    I AM INTERSTED TO GO WITH YOU AS AN EVENT-BUDDY!
                </h1>
            </div>
        </div>
    )
}

export default MessageRequestPeople