import { useState } from "react";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FormLogin() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [loginInfo, setLoginInfo] = useState({
        message: "",
        status: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setLogin({
            ...login,
            [name]: value,
        });
    }

    async function handleLoginSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    email: login.email,
                    password: login.password,
                },
                { withCredentials: true }
            ); // permette di inviare e ricevere i cookie con la richiesta HTTP

            if (res.status === 200 && res.data.check === true) {
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response.status === 401) {
                setLoginInfo({
                    message: error.response.data.message,
                    status: "warning",
                });
            } else if (error.response.status === 404) {
                setLoginInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    }

    return (
        <Card className="mt-5 my-4 p-4 rounded shadow-lg">
            <Card.Body>
                <h2 className="text-center">Login</h2>
                <Form autoComplete="off" method="OFF" id="loginForm">
                    <Form.Group controlId="loginEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* TODO: Inserire sistema password dimenticata */}
                    <Form.Group controlId="forgotPasswordLink" className="mt-2">
                        {/* <a href="/password-dimenticata">
                        Forgot password?
                    </a> */}
                        <Link to="/reset-password">Forgot password?</Link>
                    </Form.Group>

                    {loginInfo.message && (
                        <Alert variant={loginInfo.status} className="mt-3">
                            {loginInfo.message}
                        </Alert>
                    )}
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-3"
                        onClick={handleLoginSubmit}
                    >
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
