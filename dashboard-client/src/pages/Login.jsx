import axios from "axios";
import React, {useContext, useState} from "react";
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "./Auth";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setToken} = useContext(AuthContext);

    async function handleLogin(event){
        event.preventDefault()
        try{
            const requestBody = {email, password}
            
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
        <div className="container d-flex justify-content-center">
            <div className="w-50 mt-3">
                <h2 className="text-center mb-4">Login</h2>          
                <form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)} required/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
};

export default Login;