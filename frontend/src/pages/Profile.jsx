import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { Snackbar } from "../components/Snackbar"

export const Profile = () => {

    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("token") !== null
    const token = localStorage.getItem("token")

    const [formProfile, setFormProfile] = useState({
        password: "",
        tel_number: ""
    })

    const [error, setError] = useState({
        status: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormProfile({
            ...formProfile,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.patch("http://127.0.0.1:5000/manager/users/modify", formProfile, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            setError({
                status: "success",
                message: res.data.message
            })
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const handleClick = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const getUser = async () => {
        await axios.get("http://127.0.0.1:5000/manager/users/profile", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            if (res.status === 200) {
                setFormProfile({
                    password: res.data.data[0].password,
                    tel_number: res.data.data[0].tel_number,
                })
            }
        })
    }

    useEffect(() => {
        if (isLoggedIn) {
            getUser()
        }
    }, [])

    return (
        <>
            <Navbar></Navbar>
            {
                isLoggedIn ? (
                    <div className="form-signin flex items-center justify-center min-h-screen">
                        <div className="bg-white p-8 rounded shadow-md 0 w-full sm:w-96">
                            {
                                error.status ? (
                                    <Snackbar errorMessage={error.message} statusError={error.status} />
                                ) : null
                            }

                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Benvenuto/a</h2>
                            <h3 className="text-xl mb-4 text-gray-800">Puoi modificare le tue informazioni</h3>
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        // value={formProfile.password}
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
                                        value={formProfile.tel_number}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Edit information
                                </button>

                                <button
                                    type="button"
                                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 mt-5"
                                    onClick={handleClick}
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="ml-10 mt-10 text-white">
                        <h1 className="text-2xl font-bold">You are not authenticated</h1>
                        <p>Per visualizzare il tuo profilo, devi effettuare l'accesso.</p>
                        <Link to="/signin" className="mt-4 text-blue-500 underline hover:text-blue-600">Sign in</Link>
                    </div>
                )
            }

        </>
    )
}