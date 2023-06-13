import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from "react-router-dom"
import Register from './Register';
import Home from './Home';

export default function Navbar() {
    return (
        <Router>
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        {/* <a className="navbar-brand"> Navbar</a> */}
                        <Link className='navbar-brand' to="/" aria-current="page">UserManager</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    {/* <a className="nav-link active" aria-current="page">Home</a> */}
                                    <NavLink className='nav-link' to="/" aria-current="page">Home</NavLink>
                                    {/* <Link className='nav-link' to="/">Home</Link> */}
                                </li>
                                <li className="nav-item">
                                    {/* <a className="nav-link">Sign up</a> */}
                                    {/* <Link className='nav-link' to="/signup">Sign up</Link> */}
                                    <NavLink className='nav-link' to="/signup" aria-current="page">Signup</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route exact path='/' Component={Home}/>
                    <Route exact path='/signup' Component={Register} />
                </Routes>

            </>
        </Router>

    )
}