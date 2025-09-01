import React, { useContext, useEffect } from 'react'
import { App_context } from '../context'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaBloggerB } from "react-icons/fa6";
import { SiElasticcloud } from "react-icons/si";
import { FaRegEye } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import Blog_form from './Blog_form';
import Eye_ON_Post from './Eye_ON_Post';

function Dashboard() {
  const { active_user, set_Active_user, category, set_category, all_users, allblogs, latest_user, Log_out, set_Active_blog_form, Blog_post, Preview_post, fetch_user_post } = useContext(App_context)
  const navigate = useNavigate()

  const colorMap = {
    cyan: "bg-cyan-400/80",
    black: "bg-black/80",
    pink: "bg-pink-400/80",
  }
  const boxShadowMap = {
    cyan: "shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]",
    black: "shadow-[0_0_10px_2px_rgba(0,0,0,0.7)]",
    pink: "shadow-[0_0_10px_2px_rgba(244,114,182,0.7)]"
  }

  useEffect(() => {
    set_Active_user(sessionStorage.getItem("active_user") ?
      JSON.parse(sessionStorage.getItem("active_user")) : null)
  }, [])

  return (

    <div className='w-full min-h-screen bg-white pb-10'>
      <Blog_form />
      <Eye_ON_Post />

      <div className='w-full h-[70px] back flex items-center justify-between px-5 fixed top-0 left-0 z-20 '>
        <h1 className='text-white font-bold text-2xl tw_sh capitalize '>{active_user == null ? "Sign in ..." : `Welcome ${active_user}`}</h1>
        <h1 className='text-3xl text-white font-bold fixed w-full text-center tw_sh '>Blog App</h1>
        <div> {active_user == null ? (<div className='w-[160px] h-full flex justify-between'>
          <button className='py-1 px-3 bg-black cursor-pointer transition-all duration-200 ease-in active:scale-99 hover:scale-105 text-sm text-white rounded-lg z-5 bx_sh' onClick={() => navigate("/sign_up")} >Sign Up</button>
          <button className='py-1 px-3 bg-white cursor-pointer transition-all duration-200 ease-in active:scale-99 hover:scale-105 text-sm text-black rounded-lg z-5 wx_sh' onClick={() => navigate("/login")}>Login</button>
        </div>) :
          (<div className='w-[130px] h-full justify-between  items-center flex '>
            <div className='w-[40px] h-[40px] rounded-full text-white back border-white border justify-center hover:rotate-5 hover:scale-105 transition-all active:scale-100 duration-200 ease-in-out z-5 cursor-pointer flex items-center text-2xl '>P</div>
            <button className='px-3 py-1 rounded-lg bg-black text-white text-sm tracking-[-.5px] cursor-pointer z-5 hover:scale-102 active:scale-99 transition-all duration-200 ease-in-out bx_sh ' onClick={Log_out} >Log Out</button>
          </div>)} </div>
      </div>
      <div className='w-full flex justify-between pt-[100px] px-10'>
        <ul className='w-max justify-center items-center gap-7 flex '>
          {
            ["All", "Blogs", "Users"].map((ele, idx) => {
              return (
                <li key={idx} className={`font-bold text-xl cursor-pointer  ${category == ele ? "underline" : ""} tp_sh tracking-[1px] transition-all duration-200 ease-in-out hover:-translate-y-1 text-pink-500`} onClick={() => set_category(ele)}>{ele}</li>
              )
            })
          }
        </ul>
        <button className={`px-3 ${active_user ? "visible" : "invisible"} py-1 rounded-lg cx_sh cursor-pointer hover:scale-105 transition-all duration-200 ease-in active:scale-98 bg-cyan-400 text-white font-bold flex justify-center items-center gap-1`} onClick={() => set_Active_blog_form(true)} > <FaPlus className='scale-80' /> New</button>
      </div>
      <div className='w-full h-[100px] flex justify-evenly items-center mt-10 '>
        {
          [
            { title: "Total_Users", icon: <PiUsersThreeFill />, color: "cyan", value: all_users ? all_users.length + " Registered Users" : null },
            { title: "Total_Blogs", icon: <FaBloggerB />, color: "black", value: allblogs ? allblogs.length + " Posted Blogs" : null },
            { title: "Last Register", icon: <SiElasticcloud />, color: "pink", value: latest_user ? latest_user.email : null },
          ].map((ele, idx) => {
            return (
              <div key={idx} className='w-[28%] h-full bg-[whiteSmoke] gx_sh rounded-2xl p-3 flex justify-center '>
                <div className='w-[20%] h-full flex justify-center items-center '> <div className={`w-[50px] h-[50px]  rounded-full ${colorMap[ele.color]}  ${boxShadowMap[ele.color]} text-white font-bold flex justify-center items-center text-2xl`}> {ele.icon} </div> </div>
                <div className='w-[80%] h-full pl-5'>
                  <h1 className='font-bold text-xl tb_sh'>{ele.title}</h1>
                  {
                    ele.value !== null ? (
                      <p className='mt-1 text-black/70 text-md '>{ele.value}</p>
                    ) : (
                      <div className="inline-block w-[170px] h-4 mt-3 bg-gray-300 rounded animate-pulse"></div>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <h1 className='text-5xl ml-10 mt-10 text-black font-bold '>Blogs</h1>
      <div className='w-full h-max mt-5 px-10 flex justify-evenly flex-wrap items-center  '>
        {
          Blog_post?.length == 0 ? (<p className='text-gray-500 tb_sh mt-20 text-2xl font-bold text-center '>No Blogs Posted Here... </p>) :
            (
              Blog_post?.map((ele, idx) => {

                return (
                  <div key={idx} className='w-[400px] mt-5 min-h-[300px] px-3 pt-3 pb-5 bg-[whiteSmoke] gx_sh rounded-xl'>
                    <div className='w-full h-[60px] flex justify-between items-center'>

                      <div className='w-[300px] h-full flex items-center '>
                        <div className='w-[50px] h-[50px] gx_sh overflow-hidden rounded-full hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out ' onClick={() => fetch_user_post(ele.userid)}  > <img src="/admin.jpg" className='w-full h-full ' alt="" /> </div>
                        <div className='w-max h-max ml-2  capitalize '> {ele.user} </div>
                      </div>
                      <div className='w-[70px] flex justify-center items-center gap-2.5 h-full'>
                        <button className='w-[25px] h-[25px] flex justify-center cursor-pointer hover:scale-105 hover:rotate-4 transition-all duration-200 ease-in-out active:scale-100 db_shade items-center text-white rounded-sm back ' onClick={() => Preview_post(ele)} ><FaRegEye /></button>
                        <button className='w-[25px] h-[25px] flex justify-center cursor-pointer hover:scale-105 hover:rotate-4 transition-all duration-200 ease-in-out active:scale-100 db_shade items-center text-white rounded-sm back ' onClick={() => fetch_user_post(ele.userid)} ><VscPreview /></button>
                      </div>
                    </div>

                    <div className='w-[94%] border-black/40 mx-auto py-3 h-[140px] mt-3 border-t border-b '>
                      <div className='w-full h-full ' ><img className='h-full w-auto mx-auto block object-contain rounded-lg ' src={ele.img && ele.img.trim() !== "" ? ele.img : "/images.jpeg"} alt="" /> </div>
                    </div>
                    <p className='text-[13px] tracking-[-.3px] mt-2 w-[93%] mx-auto capitalize '>{ele.des}</p>

                  </div>
                )
              })
            )
        }
      </div>
    </div>
  )
}

export default Dashboard