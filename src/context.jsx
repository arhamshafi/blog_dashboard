import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const App_context = createContext()

const App_provider = ({ children }) => {

    const [login_form, set_login_form] = useState({ email: "", password: "" })
    const [sign_up_form, set_sign_up_form] = useState({ name: "", email: "", number: "", password: "" })
    const [active_user, set_Active_user] = useState(null)
    const [category, set_category] = useState("All")
    const [all_users, setall_users] = useState(null)
    const [allblogs, set_Allblogs] = useState(null)
    const [latest_user, setlatest_user] = useState(null)
    const [blog_form, set_blog_form] = useState({ img_url: "", des: "" })
    const [active_blog_form, set_Active_blog_form] = useState(false)
    const [Blog_post, setBlog_post] = useState(null)
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
    const [pr_post, setpr_post] = useState(false)
    const [prev_post, setprev_post] = useState(null)

    //========================= HANDLER ============================ //
    const Login_handler = (e) => {
        const { name, value } = e.target
        set_login_form({ ...login_form, [name]: value })
    }
    const Sign_up_handler = (e) => {
        const { name, value } = e.target
        set_sign_up_form({ ...sign_up_form, [name]: value })
    }
    const blog_form_setup = (e) => {
        const { name, value } = e.target
        set_blog_form({ ...blog_form, [name]: value })
    }
    // ============================== CREATE BLOG ============================== //
    const create_blog = async () => {
        const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
        if (!token) return
        try {

            const res = await axios.post("http://localhost:8080/blog/create_blogs", blog_form, { headers: { Authorization: `Bearer ${token}` } })
            toast.success(res.data.msg)
            set_blog_form({ img_url: "", des: "" })
            posted_blogs()
            getBlogs()
            set_Active_blog_form(false)
        }
        catch (err) {
            if (err.response && err.response.data.expired) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("profile_user");
                sessionStorage.removeItem("active_user")
                navigate("/login")
            } else {
                toast.error(err.response?.data?.msg || " Sign in Again ");
            }
        }

    }
    //=============================== fetch_user_post ==========================//

    const fetch_user_post = async (id) => {
        try {
            const res = await axios.post("http://localhost:8080/blog/fetch_user_post", { id }, { headers: { Authorization: `Bearer ${token}` } })
            toast.success(res.data.msg)
            sessionStorage.setItem("profile_user", JSON.stringify(res.data.user_blogs))
            setTimeout(() => {
                navigate("/profile_user")
            }, 1500)

        }
        catch (err) {
            if (err.response && err.response.data.expired) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("profile_user");
                sessionStorage.removeItem("active_user")
                navigate("/login")
            } else {
                toast.error(err.response?.data?.msg || " Sign in Again ");
            }
        }

    }

    // ======================================= AUTHENTICATION ============================== //
    const Sign_up = async () => {
        try {

            let res = await axios.post("http://localhost:8080/blog/sign_up", sign_up_form)
            if (res.data.success) {
                toast.success(res.data.msg)
                sessionStorage.setItem("token", JSON.stringify(res.data.token))
                sessionStorage.setItem("active_user", JSON.stringify(res.data.name))
                setTimeout(() => {
                    set_sign_up_form({ name: "", email: "", number: "", password: "" })
                    navigate("/")
                }, [1500])
            }
        }
        catch (err) {
            toast.error(err.response?.data?.msg || "Something Went Wrong")
        }


    }
    const Login = async () => {
        try {

            const res = await axios.post("http://localhost:8080/blog/login", login_form)
            if (res.data.success) {
                toast.success(res.data.msg)
                sessionStorage.setItem("active_user", JSON.stringify(res.data.name))
                sessionStorage.setItem("token", JSON.stringify(res.data.token))

                setTimeout(() => {
                    set_login_form({ email: "", password: "" })
                    navigate("/")
                }, [1500])
            }
        }
        catch (err) {
            toast.error(err.response?.data?.msg || "Something Went Wrong")
        }

    }
    // ============================================= API CALLS =================================== // 
    const getUsers = async () => {
        if (!token) return
        const res = await axios.get("http://localhost:8080/blog/all_user", {
            headers: { Authorization: `Bearer ${token}` }
        })
        setall_users(res.data.users)
    }
    const getBlogs = async () => {
        if (!token) return
        const res = await axios.get("http://localhost:8080/blog/all_blogs", {
            headers: { Authorization: `Bearer ${token}` }
        })
        set_Allblogs(res.data.blogs)
        setBlog_post(res.data.blogs)
    }
    const posted_blogs = async () => {
        const res = await axios.get("http://localhost:8080/blog/posted_blogs")
        setBlog_post(res.data.blogs)

    }
    const getLastUser = async () => {
        if (!token) return
        const res = await axios.get("http://localhost:8080/blog/last_register", {
            headers: { Authorization: `Bearer ${token}` }
        })
        setlatest_user(res.data.last_register)
    }
    //=================== PREVIEW ===================//

    const Preview_post = (post) => {
        setprev_post(post)
        setpr_post(true)
    }

    //=================== LOG OUT ======================//

    let Log_out = () => {
        set_Allblogs(null)
        setall_users(null)
        setlatest_user(null)
        set_Active_user(null)
        sessionStorage.removeItem("active_user")
        sessionStorage.removeItem("token")
    }
    //============== use efect ============= //

    useEffect(() => {
        posted_blogs()
        if (!token) return
        getUsers()
        getBlogs()
        getLastUser()
    }, [token])

    return (
        <App_context.Provider value={{
            login_form, sign_up_form, Sign_up, Login, Login_handler, Sign_up_handler, active_user, set_Active_user, blog_form_setup, create_blog,
            category, set_category, all_users, allblogs, latest_user, Log_out, blog_form, set_blog_form, active_blog_form, set_Active_blog_form,
            Blog_post, Preview_post, pr_post, setpr_post, prev_post, fetch_user_post, profile_blogs
        }} >
            {children}
        </App_context.Provider>
    )

}

export default App_provider