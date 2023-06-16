import { NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"

export default function Navbar() {

    const [cookies] = useCookies(['jwtToken'])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">UserManager</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">Signup</NavLink>
                            </li> */}

                            {
                                cookies.jwtToken ? (
                                    <li className="nav-item">
                                        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <NavLink to="/signup" className="nav-link">Signup</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}