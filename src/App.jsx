import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Sign_up from './components/Sign_up'
import Dashboard from './components/Dashboard'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile_blogs from './components/Profile_blogs'

function App() {
  return (
    <div className='back w-full min-h-screen flex justify-center items-center select-none' >
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign_up' element={<Sign_up />} />
        <Route path='/Profile_user' element={<Profile_blogs />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={1500} />
    </div>
  )
}

export default App