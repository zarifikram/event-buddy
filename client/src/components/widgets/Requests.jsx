import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../../contexts/UserContext';
import { getAge } from '../funcs';
import getData from '../getData';

function Requests() {
    const [suggestions, setSuggestions] = useState([]);
    const user = useContext(userContext);

    useEffect(() => {
        getData(`http://localhost:2000/apis/user/messageRequests/${user.username}`, setSuggestions);
    }, []);

    return (
        <div className='flex flex-col rounded-3xl h-1/2 pt-1'>

            <h5 className='font-bold text-left mb-2 h-6 '>Event-Buddy Request</h5>
            <div className="h-full rounded-3xl overflow-hidden bg-yellow-100">
                {suggestions.map((person, ind) => <RequestTile person={person} />)}
            </div>

        </div>
    )
}

export default Requests

const RequestTile = ({ person }) => <div className='flex h-10 mt-2 border-b-[.5px] mx-2'>
    <div className=" w-10 p-2 ">
        <img src={person.photo_link} className="h-full aspect-square rounded object-cover" alt="" />
    </div>
    <div className="">
        <h5 className='text-left text-xs font-medium'>{person.first_name} {person.last_name}</h5>
        <p className='text-left text-xs font-extralight'>For {person.name}</p>
    </div>
</div>

