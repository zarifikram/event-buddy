import React, { useContext } from 'react'
import DashboardPage from '../routes/DashboardPage';
import EventPage from '../routes/EventPage';
import MessagePage from '../routes/MessagePage';
import MessageRequestPage from '../routes/MessageRequestPage';
import { userContext } from "../../contexts/UserContext"

function PageController(props) {
  const { currentIndex, goToEvents, eventid } = props;

  const getPage = (index) => {
    switch(index) {
        case 0 : return <DashboardPage goToEvents={goToEvents}/> 
        case 1 : return <EventPage eventid = {eventid}/> 
        case 2 : return <MessagePage/>
        case 3 : return <MessageRequestPage/> 
    }
  }
  const user = useContext(userContext)
  console.log(user);
  return (
    <div className="w-screen h-screen bg-yellow-50">
        {getPage(currentIndex)}
    </div>
  )
}

export default PageController