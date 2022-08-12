import React, { useState } from 'react'
import { Routes, Route, Link, BrowserRouter, useNavigate } from "react-router-dom";

import SigninPage from './routes/SigninPage';
import SignupPage from './routes/SignupPage';
import UserProfilePage from './routes/UserProfilePage';
import App from '.././App.js'
import Links from './widgets/Links';
import EventSignupPage from './routes/EventSignupPage';
import EventUserProfilePage from './widgets/EventUserProfilePage';
import {userContext} from "../contexts/UserContext"
import EventSigninPage from './routes/EventSigninPage';

function HomePage() {

  const [currentUser, setCurrentUser] = useState({});
  
  

  return (
    <div>
      <userContext.Provider value={0}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Links />} />
            <Route path="signin" element={<SigninPage setCurrentUser={setCurrentUser}/>} />
            <Route path="signup" element={<SignupPage
              setCurrentUser={setCurrentUser}
            />} />
            <Route path="userprofile" element={<UserProfilePage
              currentUser={currentUser}
            />} />
            <Route path="signupEvent" element={<EventSignupPage setCurrentUser={setCurrentUser}/>} />
            <Route path="signinEvent" element={<EventSigninPage setCurrentUser={setCurrentUser}/>} />
            <Route path="eventUserProfile" element={<EventUserProfilePage currentUser={currentUser}/>} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  )
}

export default HomePage;