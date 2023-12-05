import { Link } from "react-router-dom"
import { Navbar } from "../../components/Navbar"
import { useState } from "react"
import axios from "axios"
import { Snackbar } from "../../components/Snackbar"

export const Signup = () => {

    const [formSignup, setFormSignup] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        tel_number: ""
    })

    const [error, setError] = useState({
        status: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormSignup({
            ...formSignup,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post("http://127.0.0.1:5000/auth/signup", formSignup).then((res) => {
            if (res.status === 201) {
                console.log(res);
                setFormSignup({
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    tel_number: ""
                })
            }
        }).catch((error) => {
            if (error.response.status === 409) {
                setError({
                    status: "error",
                    message: error.response.data.message
                })
            }
        })
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded shadow-md 0 w-full sm:w-96">
                    {
                        error.status ? (
                            <Snackbar errorMessage={error.message} statusError={error.status} />
                        ) : null
                    }
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your surname"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                                onChange={handleChange}
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
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Telephone number</label>
                            <input
                                type="tel"
                                id="tel_number"
                                name="tel_number"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your telephone number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-gray-700 text-sm">
                        Do you have an account?{' '}
                        <Link to={"/signin"} className="text-blue-500 hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </>
    )
}