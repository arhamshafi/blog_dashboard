import React, { useContext, useEffect } from 'react'
import { App_context } from '../context'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";

function Dashboard() {
  const { active_user, set_Active_user } = useContext(App_context)
  const navigate = useNavigate()

  useEffect(() => {
    set_Active_user(localStorage.getItem("active_user") ?
      JSON.parse(localStorage.getItem("active_user")) : null)
  }, [])

  return (

    <div className='w-full min-h-screen bg-white'>
      <div className='w-full h-[70px] back flex items-center justify-between px-5 fixed top-0 left-0'>
        <h1 className='text-white font-bold text-2xl tw_sh '>{active_user == null ? "Sign in ..." : `Welcome ${active_user}`}</h1>
        <h1 className='text-3xl text-white font-bold fixed w-full text-center tw_sh '>Blog App</h1>
        <div> {active_user == null ? (<div className='w-[160px] h-full flex justify-between'>
          <button className='py-1 px-3 bg-black cursor-pointer transition-all duration-200 ease-in active:scale-99 hover:scale-105 text-sm text-white rounded-lg z-5 bx_sh' onClick={() => navigate("/sign_up")} >Sign Up</button>
          <button className='py-1 px-3 bg-white cursor-pointer transition-all duration-200 ease-in active:scale-99 hover:scale-105 text-sm text-black rounded-lg z-5 wx_sh' onClick={() => navigate("/login")}>Login</button>
        </div>) :
          (<div className='w-[130px] h-full justify-between  items-center flex '>
            <div className='w-[40px] h-[40px] rounded-full text-white back border-white border justify-center hover:rotate-5 hover:scale-105 transition-all active:scale-100 duration-200 ease-in-out z-5 cursor-pointer flex items-center text-2xl '>P</div>
            <button className='px-3 py-1 rounded-lg bg-black text-white text-sm tracking-[-.5px] cursor-pointer z-5 hover:scale-102 active:scale-99 transition-all duration-200 ease-in-out bx_sh ' onClick={() => { localStorage.removeItem("active_user"), set_Active_user(null) }} >Log Out</button>
          </div>)} </div>
      </div>
      <div className='w-full flex justify-between pt-[100px] px-10'>
        <ul className='w-max justify-center items-center gap-7 flex '>
          <li className='font-bold text-xl cursor-pointer tp_sh tracking-[1px] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:underline text-pink-500'>All</li>
          <li className='font-bold text-xl cursor-pointer tp_sh tracking-[1px] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:underline text-pink-500'>Blog</li>
          <li className='font-bold text-xl cursor-pointer tp_sh tracking-[1px] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:underline text-pink-500'>Users</li>
        </ul>
        <button className='px-3 py-1 rounded-lg cx_sh cursor-pointer hover:scale-105 transition-all duration-200 ease-in active:scale-98 bg-cyan-400 text-white font-bold flex justify-center items-center gap-1'> <FaPlus className='scale-80' /> New</button>
      </div>
    </div>
  )
}

export default Dashboard