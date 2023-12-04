import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const Profile = () => {

    const isLoggedIn = localStorage.getItem("token") !== null

    return (
        <>
            <Navbar></Navbar>
            {
                isLoggedIn ? (
                    <h1 className="text-2xl text-white">Profilo</h1>
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