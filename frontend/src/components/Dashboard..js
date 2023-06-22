import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export default function Dashboard() {

    const [cookie, setCookie, removeCookie] = useCookies(['jwtToken'])
    const [user, setUser] = useState([])
    const [isLogout, setIsLogout] = useState(false)

    async function fetchData() {
        try {
            const res = await axios.get("http://localhost:5000/manager/users/profile", {
                headers: {
                    Authorization: `Bearer ${cookie.jwtToken}`
                }
            })

            if (res.data.check === true) {
                setUser(res.data.data[0])
            }
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        fetchData()
    })

    function handleLogout() {
        removeCookie("jwtToken")
        setIsLogout(true)
    }

    if(isLogout){
        return <Navigate to="/" />
    }

    return (
        <>
            <h1>Benvenuto {user.name}</h1>
            <button type="submit" className="btn btn-secondary" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}