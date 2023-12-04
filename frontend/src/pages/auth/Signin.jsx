import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"

export const Signin = () => {

    const navigate = useNavigate()

    const [formSignin, setFormSignin] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormSignin({
            ...formSignin,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post("http://127.0.0.1:5000/auth/login", formSignin).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.data)
                navigate("/profile")
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                console.log(error.response.data.message);
            }else if(error.response.status===401){
                console.log(error.response.data.message);
            }
        })

        setFormSignin({
            email: "",
            password: ""
        })
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            document.querySelector(".form-signin").style.display = "none"
            navigate("/profile")
        }
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className="form-signin flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded shadow-md 0 w-full sm:w-96">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                value={formSignin.email}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                value={formSignin.password}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="mt-4 text-gray-700 text-sm">
                        Don't have an account?{' '}
                        <Link to={"/signup"} className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </>


    )
}