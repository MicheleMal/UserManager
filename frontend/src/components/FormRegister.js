import { useState } from "react";
import axios from "axios";
import { Button, Card, Alert, Form } from "react-bootstrap";

export default function FormRegister() {
    const [register, setRegister] = useState({
        name: "",
        surname: "",
        password: "",
        email: "",
        tel_number: "",
    });
    const [registerInfo, setRegisterInfo] = useState({
        message: "",
        status: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setRegister({
            ...register,
            [name]: value,
        });
    }

    async function handleRegisterSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/auth/signup", {
                name: register.name,
                surname: register.surname,
                password: register.password,
                email: register.email,
                tel_number: register.tel_number,
            });

            if (res.status === 201 && res.data.check === true) {
                setRegisterInfo({
                    message:
                        "Un email è stata inviata all'indirizzo email da te inserito",
                    status: "success",
                });
                // console.log("Un email è stata inviata all'indirizzo email da te inserito");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setRegisterInfo({
                    message: "Email already registered",
                    status: "danger",
                });
            }
        }
    }

    return (
        <Card className="mt-5 my-4 p-4 rounded shadow-lg">
            <Card.Body>
                <h2 className="text-center">Registrazione</h2>
                <Form autoComplete="off" method="POST" id="registerForm">
                    <Form.Group controlId="registerNome">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="registerCognome">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter surname"
                            name="surname"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="registerEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="registerPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="registerTelNumber">
                        <Form.Label>Telephone number</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Enter your telephone number"
                            name="tel_number"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {registerInfo.message && (
                        <Alert variant={registerInfo.status} className="mt-3">
                            {registerInfo.message}
                        </Alert>
                    )}

                    <Button
                        variant="primary"
                        type="submit"
                        className="mb-3 mt-3"
                        onClick={handleRegisterSubmit}
                    >
                        Sign up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
