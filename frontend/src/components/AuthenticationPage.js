import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Alert,
} from "react-bootstrap";

export default function AuthenticationPage() {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [loginInfo, setLoginInfo] = useState({
        message: "",
        status: "",
    });

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
        const { id } = e.target.form;

        if (id === "loginForm") {
            setLogin({
                ...login,
                [name]: value,
            });
        } else if (id === "registerForm") {
            setRegister({
                ...register,
                [name]: value,
            });
        }
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
            if (error.response && error.response.status === 404) {
                setLoginInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
            } else if (error.response && error.response.status === 401) {
                setLoginInfo({
                    message: "Account not verified, check his email",
                    status: "warning",
                });
            }
        }
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
        <Container>
            <Row className="justify-content-center">
                {/* Login */}
                <Col md={6}>
                    <Card className="mt-5 my-4 p-4 rounded shadow-lg">
                        <Card.Body>
                            <h2 className="text-center">Login</h2>
                            <Form
                                autoComplete="off"
                                method="OFF"
                                id="loginForm"
                            >
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
                                <Form.Group
                                    controlId="forgotPasswordLink"
                                    className="mt-2"
                                >
                                    {/* <a href="/password-dimenticata">
                                        Forgot password?
                                    </a> */}
                                    <Link to="/">Forgot password?</Link>
                                </Form.Group>

                                {loginInfo.message && (
                                    <Alert
                                        variant={loginInfo.status}
                                        className="mt-3"
                                    >
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
                </Col>

                {/* Register */}
                <Col md={6}>
                    <Card className="mt-5 my-4 p-4 rounded shadow-lg">
                        <Card.Body>
                            <h2 className="text-center">Registrazione</h2>
                            <Form
                                autoComplete="off"
                                method="POST"
                                id="registerForm"
                            >
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
                                    <Alert
                                        variant={registerInfo.status}
                                        className="mt-3"
                                    >
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
                </Col>
            </Row>
        </Container>
    );
}
