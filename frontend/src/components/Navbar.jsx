import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex">
                <li className="mr-6">
                    <NavLink to={"/"} className="text-white hover:text-gray-300">Home</NavLink>
                </li>
                <li className="mr-6">
                    <NavLink to={"/profile"} className="text-white hover:text-gray-300">Profile</NavLink>
                </li>
                <li className="mr-6 ml-auto">
                    <NavLink to={"/signin"} className="text-white hover:text-gray-300">Signin</NavLink>
                </li>
            </ul>
        </nav>

    )
}   