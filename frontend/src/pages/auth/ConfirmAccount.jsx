import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../../components/Navbar";
import axios from "axios";

export const ConfirmAccount = () => {

    const navigate = useNavigate()
    const { tokenConfirmation } = useParams()
    
    useEffect(()=>{     
        axios.get(`http://127.0.0.1:5000/auth/confirm/${tokenConfirmation}`).then((res)=>{
            if(res.status===200){
                console.log("Account verified");
            }
        }).catch((error)=>{
            if(error.response.status === 404){
                navigate("/signin")
            }
        })
    },[tokenConfirmation])

    return (
        <>
            <Navbar></Navbar>
            <div className="container mx-auto mt-10 text-white">
                <div className="flex justify-center">
                    <div className="w-full">
                        <h1 className="text-2xl font-bold">Your account has been confirmed!</h1>
                        <p className="text-zinc-400">You can now sign in.</p>
                        <Link to="/signin" className="mt-4 text-blue-500 underline hover:text-blue-600">Sign in</Link>
                    </div>
                </div>
            </div>
        </>

    )
}