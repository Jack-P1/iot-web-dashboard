import axios from "axios";
import React, {useContext, useState} from "react";
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "./Auth";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setToken} = useContext(AuthContext);

    async function handleLogin(event){
        event.preventDefault()
        try{
            const requestBody = {email, password}
            console.log("GOT HERE!!!")

            const response = await axios.post('http://127.0.0.1:3000/api/user/login/', {email, password}, 
                {headers: {'content-type': 'application/x-www-form-urlencoded'}})
            if(response.status == 200){
                setToken(response.data.token)
                navigate('/home')
            }
        } catch(error){
            // Add error message
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2> Login </h2>
                <div>
                    <label htmlFor="email"> Email address: </label>
                    <input type="email" onChange={event => setEmail(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="password"> Password: </label>
                    <input type="password" onChange={event => setPassword(event.target.value)} />
                </div>
                <button type="submit"> Login </button>
            </form>
        </div>
    )
};

export default Login;