import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";

export default function Dashboard() {

    const [cookie] = useCookies(['jwtToken'])
    const [user, setUser] = useState([])

    async function fetchData() {
        try {
            const res = await axios.get("http://localhost:5000/manager/users/profile", {
                headers: {
                    Authorization: `Bearer ${cookie.jwtToken}`
                }
            })
    
            if(res.data.check===true){
                setUser(res.data.data[0])
            }
        } catch (error) {
            console.error(error);
        }
       
    }

    useEffect(() => {
        fetchData()
    })

    return (
        <>
            <h1>Benvenuto {user.name}</h1>
        </>
    )
}