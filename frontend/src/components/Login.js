import { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

export default function Login() {
    
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    function handleChange(e){
        const {name, value} = e.target
    
        setLogin({
            ...login,
            [name]: value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/auth/login",{
                email: login.email,
                password: login.password
            })

            if(res.data.check===true){
                navigate("/") //TODO: Aggiungere dashboard
            }
        } catch (error) {
            console.error(error);
        }

        // console.log(`Login effettuato\n${login.email} ${login.password}`);
    }

  return (
    <Form method='POST' autoComplete='off'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>
      <Form.Text className="text-muted">
        Non sei registrato? <Link to="/register">Sign up</Link>
      </Form.Text>
    </Form>
  );
}