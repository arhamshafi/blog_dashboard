import React, { useContext } from 'react'
import { App_context } from '../context'
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import Eye_ON_Post from './Eye_ON_Post';

function Profile_blogs() {
    const { Preview_post } = useContext(App_context)
    const user_profile = sessionStorage.getItem("profile_user") ? JSON.parse(sessionStorage.getItem("profile_user")) : null
    const navigate = useNavigate()
    // console.log(user_profile);


    return (
        <div className='w-full min-h-screen bg-white pt-[70px] pb-10 '>
            <Eye_ON_Post />
            <div className='w-full h-[70px] back flex fixed top-0 left-0 justify-between items-center px-10'>
                <button
                    className='text-white text-3xl font-bold flex items-center gap-1 hover:-translate-x-2 cursor-pointer transition-all ease-in-out duration-200'
                    onClick={() => {
                        navigate("/")
                        setTimeout(() => {
                            sessionStorage.removeItem("profile_user")
                        }, 1000);
                    }}
                >
                    <FaAngleLeft className='text-2xl' /> Back
                </button></div>
            <div className='w-full h-max flex items-center px-10  pt-5 pb-5 bg-[whiteSmoke] '>
                <div className='w-[200px] h-[200px] rounded-full gx_sh overflow-hidden '> <img src="/admin.jpg" className='w-full h-full' alt="" /> </div>
                <div className=' tracking-[2px] capitalize ml-10 '>
                    <p className='text-black font-bold tb_sh text-5xl'> {user_profile[0]?.user} </p>
                    <p className='text-black/40 text-2xl mt-5 '> <span className='text-black font-bold'>id</span> : {user_profile[0]?._id}</p>
                </div>
            </div>

            <div className='w-full h-max py-5 flex justify-evenly items-center flex-wrap '>
                {
                    user_profile?.map((ele, idx) => {
                        return (
                            <div key={idx} className='w-[400px] mt-5 min-h-[300px] px-3 pt-3 pb-5 bg-[whiteSmoke] gx_sh rounded-xl'>
                                <div className='w-full h-[60px] flex justify-between items-center'>

                                    <div className='w-[300px] h-full flex items-center '>
                                        <div className='w-[50px] h-[50px] gx_sh overflow-hidden rounded-full hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out '> <img src="/admin.jpg" className='w-full h-full ' alt="" /> </div>
                                        <div className='w-max h-max ml-2  capitalize '> {ele.user} </div>
                                    </div>
                                    <div className='w-[70px] flex justify-center items-center gap-2.5 h-full'>
                                        <button className='w-[25px] h-[25px] flex justify-center cursor-pointer hover:scale-105 hover:rotate-4 transition-all duration-200 ease-in-out active:scale-100 db_shade items-center text-white rounded-sm back ' onClick={() => Preview_post(ele)} ><FaRegEye /></button>
                                    </div>
                                </div>

                                <div className='w-[94%] border-black/40 mx-auto py-3 h-[140px] mt-3 border-t border-b '>
                                    <div className='w-full h-full ' ><img className='h-full w-auto mx-auto block object-contain rounded-lg ' src={ele.img && ele.img.trim() !== "" ? ele.img : "/images.jpeg"} alt="" /> </div>
                                </div>
                                <p className='text-[13px] tracking-[-.3px] mt-2 w-[93%] mx-auto capitalize '>{ele.des}</p>

                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Profile_blogs