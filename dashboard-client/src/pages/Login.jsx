import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom"

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event){
        event.preventDefault()
        try{
            const requestBody = {email, password}
            console.log("GOT HERE!!!")
            const response = await fetch('http://127.0.0.1:3000/api/user/login/', 
                { 
                method: "POST",
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(requestBody)
            })
            const data = await response.json()
            localStorage.setItem('token', data.token)
            navigate('/welcome')
        } catch(error){
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