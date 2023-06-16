import { useState } from "react";
import axios from "axios"
import { Navigate, Link } from "react-router-dom";

export default function Register() {

    const [register, setRegister] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        tel_number: ""
    })

    const [isRegister, setIsRegister] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target

        setRegister({
            ...register,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/auth/signup", {
                name: register.name,
                surname: register.surname,
                email: register.email,
                password: register.password,
                tel_number: register.tel_number,
            })

            if (res.data.check === true) {
                setIsRegister(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (isRegister) {
        return <Navigate to='/login' />
    }

    return (
        <div className="container mt-3">
            <form autoComplete="off" method="post">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" onChange={handleChange} />
                    <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="surname" name="surname" placeholder="Surname" onChange={handleChange} />
                    <label htmlFor="surname">Surname</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={handleChange} />
                    <label htmlFor="email">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="tel" className="form-control" id="tel_number" name="tel_number" placeholder="Telephone" onChange={handleChange} />
                    <label htmlFor="tel_number">Telephone</label>
                </div>

                <input type="submit" className="btn btn-primary" value="Signup" onClick={handleSubmit} />
            </form>

            <Link className="btn btn-link" to={"/login"}>Se sei già registrato clicca qui</Link>
        </div>
    )
}