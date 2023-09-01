import { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link} from "react-router-dom"

export default function Register() {

    const [register, setRegister] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        tel_number: ""
    })

    function handleChange(e){
        const {name, value} = e.target
    
        setRegister({
            ...register,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault()

        console.log(`Registrazione effettuato}`);
    }

  return (
    <Form method='POST' autoComplete='off'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name='name' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Surname</Form.Label>
        <Form.Control type="text" placeholder="Enter surname" name='surname' onChange={handleChange} />
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Telephone Number</Form.Label>
        <Form.Control type="tel" placeholder="Enter telephone number" name='tel_number' onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Sign up
      </Button>
      <Form.Text className="text-muted">
        Hai già un account? <Link to="/login">Login</Link>
      </Form.Text>
    </Form>
  );
}