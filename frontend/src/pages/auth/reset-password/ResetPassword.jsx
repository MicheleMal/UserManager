import { useState } from "react"
import { Navbar } from "../../../components/Navbar"
import axios from "axios"
import { Snackbar } from "../../../components/Snackbar"
import { useNavigate } from "react-router-dom"

export const ResetPassword = () => {

    const navigate = useNavigate()
    
    const [step, setStep] = useState(1)
    const [formReset, setFormReset] = useState({
        email: "",
        otp: "",
        password: ""
    })
    const [error, setError] = useState({
        status: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormReset({
            ...formReset,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (step === 1) {
            axios.post("http://127.0.0.1:5000/auth/reset-password-request", { email: formReset.email }).then((res) => {
                if (res.status === 200) [
                    setStep(step + 1),
                    setError({
                        message: "OTP code sent in email",
                        status: "success"
                    })
                ]
            }).catch((error) => {
                if (error.response.status === 404) {
                    setError({
                        message: error.response.data.message,
                        status: "error"
                    })
                }
            })
        } else if (step === 2) {
            axios.post("http://127.0.0.1:5000/auth/reset-password", { otp: formReset.otp, password: formReset.password }).then((res) => {
                if (res.status === 200) {
                    // setError({
                    //     message: error.response.data.message,
                    //     status: "success"
                    // })
                    navigate("/")
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    setError({
                        message: error.response.data.message,
                        status: "error"
                    })
                }
            })
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="form-signin flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded shadow-md 0 w-full sm:w-96">
                    {
                        error.status ? (
                            <Snackbar errorMessage={error.message} statusError={error.status} />
                        ) : null
                    }
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Reset password</h2>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        {/* Step 1 */}
                        <div className="mb-4">
                            {
                                step === 1 && (
                                    <>
                                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                            placeholder="Enter your email"
                                            onChange={handleChange}
                                            // value={formReset.email}
                                            required
                                        />
                                    </>

                                )
                            }
                        </div>

                        {/* Step 2 */}
                        <div className="mb-4">
                            {
                                step === 2 && (
                                    <>
                                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">New password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                            placeholder="Enter your new password"
                                            onChange={handleChange}
                                            // value={formSignin.email}
                                            required
                                        />
                                    </>

                                )
                            }
                        </div>
                        <div className="mb-4">
                            {
                                step === 2 && (
                                    <>
                                        <label htmlFor="code_otp" className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
                                        <input
                                            type="text"
                                            id="code_otp"
                                            name="otp"
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                            placeholder="Enter your OTP"
                                            onChange={handleChange}
                                            // value={formSignin.email}
                                            required
                                        />
                                    </>

                                )
                            }
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Reset password
                        </button>
                    </form>
                </div>

            </div>
        </>
    )


}