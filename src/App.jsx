import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Sign_up from './components/Sign_up'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className='back w-full min-h-screen flex justify-center items-center ' >
      <Routes>
        {/* <Route path='/' element={<Dashboard />} /> */}
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<Sign_up />} />
      </Routes>
    </div>
  )
}

export default App