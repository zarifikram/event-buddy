import React from 'react'
import AdminDashboardPage from "../widgets/AdminDashboardPage"
import AdminEventPage from "../widgets/AdminEventPage"
import AdminLogisticsPage from "../widgets/AdminLogisticsPage"
import AdminSponsorPage from "../widgets/AdminSponsorPage"

function PageController2(props) {
  const { currentIndex } = props;

  const getPage = (index) => {
    switch(index) {
        case 0 : return <AdminDashboardPage/>
        case 1 : return <AdminEventPage/> 
        case 2 : return <AdminLogisticsPage/>
        case 3 : return <AdminSponsorPage/> 
    }
  }

  return (
    <div className="w-screen h-screen bg-yellow-50">
        {getPage(currentIndex)}
    </div>
  )
}

export default PageController2