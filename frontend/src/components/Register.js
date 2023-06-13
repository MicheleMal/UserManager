import { useState } from "react"
import axios from "axios"

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        tel_number: ""
    })

    function handleChange(e) {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/auth/signup", {
                name: form.name,
                surname: form.surname,
                email: form.email,
                password: form.password,
                tel_number: form.tel_number,
            })

            if (res.data.check === true) {
                console.log(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <form autoComplete="off">
            <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control" id="name" name="name" placeholder="Name" aria-label="name" aria-describedby="basic-addon1" onChange={handleChange} required />
                <label forhtml="name">Name</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control" id="surname" name="surname" placeholder="Surname" aria-label="surname" aria-describedby="basic-addon1" onChange={handleChange} required />
                <label forhtml="name">Surname</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" onChange={handleChange} required />
                <label forhtml="name">Email</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" onChange={handleChange} required />
                <label forhtml="name">Password</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="tel" className="form-control" id="tel_number" name="tel_number" placeholder="Telephone" aria-label="telephone" aria-describedby="basic-addon1" onChange={handleChange} required />
                <label forhtml="name">Telephone</label>
            </div>

            <div className="col-12">
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Sign Up</button>
            </div>

        </form>
    )
}