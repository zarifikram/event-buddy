import React from 'react'
import { getAge } from '../funcs';

function SuggestionsTile(props) {
    const { person } = props;
    return (
        <div className='flex h-10 mt-2 border-b-[.5px] mx-2'>
            <div className=" w-10 p-2 ">
                <img src={person.photo_link} className="h-full aspect-square rounded object-cover" alt="" />
            </div>
            <div className="">
                <h5 className='text-left text-xs font-medium'>{person.first_name} {person.last_name}</h5>
                <p className='text-left text-xs font-extralight'>{person.occupation}, {getAge(person.dob)}</p>
            </div>
        </div>
    )
}

export default SuggestionsTile