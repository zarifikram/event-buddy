import React from 'react'
import Requests from './Requests'
import Suggestions from './Suggestions'

function SuggestionsAndRequest() {
    return (
        <div className='h-full pl-2 w-1/4'>
            <div className="flex flex-col  h-full w-full rounded-3xl">
                
                <Suggestions />
                <Requests />
            </div>
        </div>
    )
}

export default SuggestionsAndRequest;