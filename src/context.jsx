import axios from "axios";
import { createContext, useState } from "react";

export const App_context = createContext()

const App_provider = ({ children }) => {

    const [login_form, set_login_form] = useState({ email: "", password: "" })
    const [sign_up_form, set_sign_up_form] = useState({ name: "", email: "", number: "", password: "" })

    const Login_handler = (e) => {
        const { name, value } = e.target
        set_login_form({ ...login_form, [name]: value })
    }
    const Sign_up_handler = (e) => {
        const { name, value } = e.target
        set_sign_up_form({ ...sign_up_form, [name]: value })
    }



    const Sign_up = async () => {
        try{

            let res = await axios.post("http://localhost:8080/blog/sign_up", sign_up_form)
            console.log(res.data);
        }
        catch(err){
            console.log(err.response?.data?.msg);
            
        }
        

    }

    const Login = () => {
        console.log(login_form);

    }

    return (
        <App_context.Provider value={{ login_form, sign_up_form, Sign_up, Login, Login_handler, Sign_up_handler }} >
            {children}
        </App_context.Provider>
    )

}

export default App_provider