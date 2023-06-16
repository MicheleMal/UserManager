import axios from "axios"
import { useState } from "react"
import {useCookies} from "react-cookie"
import { Navigate } from "react-router-dom"

export default function Login() {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [setCookie] = useCookies(['jwtToken'])
    const [isLogin, setIsLogin] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target

        setLogin({
            ...login,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/auth/login", {
                email: login.email,
                password: login.password
            })
            setCookie('jwtToken', res.data.data)
            setIsLogin(true)
        } catch (error) {
            console.error(error);
        }
    }

    if(isLogin){
        return <Navigate to="/dashboard"/>
    }

    return (
        <div className="container mt-3">
            <form autoComplete="off" method="post">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={handleChange} />
                    <label htmlFor="email">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                </div>

                <input type="submit" className="btn btn-primary" value="Login" onClick={handleSubmit} />
            </form>
        </div>
    )
}