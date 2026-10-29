import { useState } from 'react'
import './App.css'
import AuthForm from './components/AuthForm'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import HomePage from './components/HomePage'
import CommunityChat from './components/CommunityChat'

function App() {

  const [userData,setUserData] = useState({userId:"0",location:"",name:""});

  const onLoginIn = function(data){
    setUserData(data);
    
  }
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={
          <AuthForm onLoginIn={onLoginIn}/>
        }>
        </Route>

        <Route path='/homepage' element={
          <HomePage userData={userData}/>
        }>

        </Route>
        <Route path="/chat" element={<CommunityChat userData={userData} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
