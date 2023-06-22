import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom"

export default function Login() {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [cookie, setCookie] = useCookies(['jwtToken'])
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

    if (isLogin) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form method="post" className="p-4 bg-light rounded w-50" autoComplete="off">
                <h2>Login</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    )
}