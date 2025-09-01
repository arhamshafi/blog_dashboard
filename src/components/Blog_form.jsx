import React, { useContext } from 'react'
import { App_context } from '../context'

function Blog_form() {
    const { active_blog_form, set_Active_blog_form, blog_form_setup, blog_form, create_blog } = useContext(App_context)
    return (
        <div className={`w-full h-screen backdrop-blur-sm fixed z-5 flex justify-center items-center pt-10 top-0 left-0 transition-all duration-200 ease-in-out  ${active_blog_form ? "visible opacity-100" : "invisible opacity-0 "} `} onClick={() => set_Active_blog_form(false)} >
            <div className='w-[500px] h-[350px] rounded-xl side py-3 ' onClick={(e) => e.stopPropagation()} >
                <h1 className='text-white font-bold text-center tw_sh mt-5 text-2xl tracking-[.5px] '> Create Blog </h1>
                <input type="text" className='w-[400px] h-[40px] block mx-auto mt-7 bg-white rounded-lg px-3 outline-none  ' placeholder='Image URL Here...' name='img_url' value={blog_form.img_url} onChange={blog_form_setup} />
                <textarea className='w-[400px] h-[100px] block mx-auto mt-5 bg-white rounded-lg px-3 outline-none py-2 resize-none text-sm ' placeholder='Description' onChange={blog_form_setup} value={blog_form.des} name='des' ></textarea>
                <button className='w-[400px] h-[40px] block mx-auto bg-black rounded-lg mt-7 text-white tw_sh uppercase cursor-pointer hover:scale-102 active:scale-100 transition-all duration-200 ease-in-out ' onClick={create_blog} >Add Blog</button>
            </div>
        </div>
    )
}

export default Blog_form