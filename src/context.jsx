import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const App_context = createContext()

const App_provider = ({ children }) => {

    const [login_form, set_login_form] = useState({ email: "", password: "" })
    const [sign_up_form, set_sign_up_form] = useState({ name: "", email: "", number: "", password: "" })
    const [active_user, set_Active_user] = useState(null)
    const navigate = useNavigate()
    const Login_handler = (e) => {
        const { name, value } = e.target
        set_login_form({ ...login_form, [name]: value })
    }
    const Sign_up_handler = (e) => {
        const { name, value } = e.target
        set_sign_up_form({ ...sign_up_form, [name]: value })
    }



    const Sign_up = async () => {
        try {

            let res = await axios.post("http://localhost:8080/blog/sign_up", sign_up_form)
            if (res.data.success) {
                toast.success(res.data.msg)
                localStorage.setItem("token", JSON.stringify(res.data.token))
                localStorage.setItem("active_user", JSON.stringify(res.data.name))
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
                localStorage.setItem("active_user", JSON.stringify(res.data.name))
                localStorage.setItem("token", JSON.stringify(res.data.token))
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

    return (
        <App_context.Provider value={{ login_form, sign_up_form, Sign_up, Login, Login_handler, Sign_up_handler, active_user, set_Active_user }} >
            {children}
        </App_context.Provider>
    )

}

export default App_provider