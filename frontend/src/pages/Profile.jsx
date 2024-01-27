import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { Snackbar } from "../components/Snackbar"

export const Profile = () => {

    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("token") !== null
    const token = localStorage.getItem("token")
    const [allUsers, setAllUsers] = useState([])

    const [user, setUser] = useState({
        name: "",
        surname: "",
        password: "",
        tel_number: "",
        role: ""
    })

    const [newUserRole, setNewUserRole] = useState({
        id_user: 0,
        role: "",
        email: ""
    })

    const [error, setError] = useState({
        status: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target

        if (type === "password" || type === "tel") {
            setUser({
                ...user,
                [name]: value
            })
        } else if (type === "select-one") {
            const id_user = name === "email" ? allUsers.find(user => user.email === value).id_user : null

            setNewUserRole({
                ...newUserRole,
                [name]: value,
                id_user: id_user
            })
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.patch("http://127.0.0.1:5000/manager/users/modify", user, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            if (res.status === 200) {
                setError({
                    status: "success",
                    message: res.data.message
                })
            }

        }).catch((error) => {
            console.log(error.message);
        })
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const handleDelete = () => {
        axios.delete("http://127.0.0.1:5000/manager/users/delete", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                localStorage.removeItem("token")
                navigate("/")
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const handleSubmitChangeRole = async (e) => {
        e.preventDefault()
        await axios.patch("http://127.0.0.1:5000/manager/users/modify/role", newUserRole, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setError({
                    status: "success",
                    message: res.data.message
                })
            }
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    const getUserAuthenticated = async () => {
        await axios.get("http://127.0.0.1:5000/manager/users/profile", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            if (res.status === 200) {
                // setFormProfile({
                //     password: res.data.data[0].password, 
                //     tel_number: res.data.data[0].tel_number,
                // })
                setUser({
                    name: res.data.data[0].name,
                    surname: res.data.data[0].surname,
                    password: res.data.data[0].password,
                    tel_number: res.data.data[0].tel_number,
                    role: res.data.data[0].role
                })
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const getAllUsers = async () => {
        await axios.get("http://127.0.0.1:5000/manager/users/all", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            if (res.status === 200) {
                setAllUsers(res.data.data)
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }

    useEffect(() => {
        if (isLoggedIn) {
            getUserAuthenticated()
            getAllUsers()
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
                                    <Snackbar message={error.message} status={error.status} />
                                ) : null
                            }

                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Benvenuto/a {user.name}</h2>
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
                                        // value={formProfile.tel_number}
                                        value={user.tel_number}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                                >
                                    Edit information
                                </button>

                                <button
                                    type="button"
                                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none mt-5"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                                <button
                                    type="button"
                                    className="w-full mb-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none mt-5"
                                    onClick={handleDelete}
                                >
                                    Delete profile
                                </button>

                                </form>
                                
                                {/* Form change role */}
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">Cambiare ruolo ad un utente</h3>
                                <form onSubmit={handleSubmitChangeRole}>               
                                {
                                    user.role === "admin" | "owner" ? (
                                        <>
                                            <div className="mb-4 mt-6">
                                                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Seleziona nuovo ruolo</label>
                                                <select
                                                    id="role"
                                                    name="role"
                                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                                    onChange={handleChange}
                                                    value={newUserRole.role}
                                                    required
                                                >
                                                    <option value="">Seleziona ruolo</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="owner">Owner</option>
                                                    <option value="user">User</option>
                                                </select>
                                            </div>

                                            <div className="">
                                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Seleziona email</label>
                                                <select
                                                    id="email"
                                                    name="email"
                                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                                    onChange={handleChange}
                                                    value={newUserRole.email}
                                                    required
                                                >
                                                    <option value="">Seleziona email</option>
                                                    {
                                                        allUsers.map((user) => (
                                                            <option key={user.id_user} value={user.email}>{user.email}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-non mt-5"
                                            >
                                                Cambia ruolo
                                            </button>
                                        </>
                                    ) : null
                                }

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