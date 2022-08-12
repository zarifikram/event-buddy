import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { userContext } from '../../contexts/UserContext';
import SuggestionsTile from './SuggestionsTile'

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    const getData = require('../getData')
    const user = useContext(userContext);
    useEffect(() => {
        getData.default(`/apis/user/suggestions/${user.username}`, setSuggestions);
    }, []);
    return (
        <div className='flex flex-col rounded-3xl h-1/2 pb-1'>


            <h5 className='font-bold text-left mb-2'>You May Like</h5>
            <div className="grow bg-yellow-100 rounded-3xl overflow-hidden">
                {suggestions.length === 0 ? "No suggestions avaiable." : suggestions.map((person, ind) => <SuggestionsTile person={person} />)}
            </div>

        </div>
    )
}

export default Suggestions