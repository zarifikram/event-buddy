import React from 'react'
import { ListItemButton } from "@mui/material"
function RecepientBox(props) {
    const { recepient, index, selectedIndex, getRecepient } = props;
    const selected = index === selectedIndex;

    return (
        <ListItemButton className={`px-2 mt-2 rounded-2xl w-full + ${selected ? 'bg-yellow-400' : ""} `} onClick={() => getRecepient(index)}>
            <div className="">
                <img className="w-8 rounded-full object-cover" src={(recepient.photo_link)} alt="" />
            </div>
            <h2 className={`text-xs ${selected ? "font-bold" : "" } ml-2`}>{recepient.first_name} {recepient.last_name}</h2>
        </ListItemButton>
    )
}

export default RecepientBox