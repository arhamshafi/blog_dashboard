import React, { useContext } from 'react'
import { VscPreview } from "react-icons/vsc";
import { App_context } from '../context';
import { FaXmark } from "react-icons/fa6";

function Eye_ON_Post() {
    const { prev_post, pr_post, setpr_post } = useContext(App_context)
    return (
        <div className={`w-full min-h-screen backdrop-blur-sm fixed top-0 left-0 z-5 flex bg-black/30 justify-center items-center pt-[70px] ${pr_post ? "visible opacity-100 " : "invisible opacity-0 "} transition-all duration-200 ease-in-out `} onClick={() => setpr_post(false)} >
            <div className='w-[700px] mt-5 min-h-[500px] px-5 pt-5 pb-8 bg-[whiteSmoke] gx_sh rounded-xl' onClick={(e) => e.stopPropagation()}>
                <div className='w-full h-[90px] flex justify-between items-center'>

                    <div className='w-[530px] h-full flex items-center'>
                        <div className='w-[80px] h-[80px] gx_sh overflow-hidden rounded-full '> <img src="/admin.jpg" className='w-full h-full ' alt="" /> </div>
                        <div className='w-max h-max ml-4 text-3xl tracking-[2px] text-black font-bold tb_sh capitalize '> {prev_post?.user} </div>
                    </div>
                    <div className='w-[120px] flex justify-center items-center gap-2.5 h-full'>
                        <button className='w-[35px] h-[35px] flex justify-center cursor-pointer text-2xl hover:scale-105 hover:rotate-4 transition-all duration-200 ease-in-out active:scale-100 db_shade items-center text-white rounded-lg back ' onClick={() => setpr_post(false)} ><FaXmark /></button>
                        <button className='w-[35px] h-[35px] flex justify-center cursor-pointer text-2xl hover:scale-105 hover:rotate-4 transition-all duration-200 ease-in-out active:scale-100 db_shade items-center text-white rounded-lg back '><VscPreview /></button>
                    </div>
                </div>

                <div className='w-[94%] border-black/20  mx-auto py-5 h-[250px] mt-3 border-t-2 border-b-2 '>
                    <div className='w-full h-full'><img className='h-full w-auto mx-auto block object-contain rounded-lg ' src={prev_post?.img && prev_post?.img.trim() !== "" ? prev_post.img : "/images.jpeg"} alt="" /> </div>
                </div>
                <p className=' tracking-[-.3px] text-md mt-2 w-[93%] mx-auto capitalize '> {prev_post?.des} </p>

            </div>
        </div>
    )
}

export default Eye_ON_Post