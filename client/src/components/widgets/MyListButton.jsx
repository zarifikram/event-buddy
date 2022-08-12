import React from 'react'
import {ListItemButton} from "@mui/material"
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';

const getIcon = (index, selected) => {
    
    switch(index) {
        case 0 : return <DashboardRoundedIcon className={selected ? 'text-yellow-800' : "text-grey-700"}/>; 
        case 1 : return <TheaterComedyRoundedIcon className={selected ? 'text-yellow-800' : 'text-grey-700'}/>; 
        case 2 : return <MessageRoundedIcon className={selected ? 'text-yellow-800' : "text-grey-700"}/>; 
        case 3 : return <MarkUnreadChatAltRoundedIcon className={selected ? 'text-yellow-800' : "text-grey-700"}/>; 
    }
}

function MyListButton(props) {
  const {text, index, currentIndex, onButtonClick} = props;
  const selected = index === currentIndex

  return (
    <ListItemButton className={`px-4 mx-4 rounded-2xl + ${selected ? ' bg-yellow-400' : ""} `} onClick={()=>onButtonClick(index)}>
        {getIcon(index, selected)}
        <h2 className='text-xl text-black ml-4'>{text}</h2>
    </ListItemButton> 
  )
}

export default MyListButton