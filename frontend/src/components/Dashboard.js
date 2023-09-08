// import axios from "axios"
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Dashboard() {
    const [cookies] = useCookies(["jwtToken"]);
    const jwtToken = cookies.jwtToken;

    const [user, setUser] = useState([]);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);

    async function fetchData() {
        try {
            console.log("Chiamata a fetchData in corso...");
            const res = await axios.get(
                "http://localhost:5000/manager/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            if (res.data.check === true) {
                setUser(res.data.data[0]);
            }
            console.log("Chiamata a fetchData completata con successo!");
        } catch (error) {
            console.error(error);
        }
    }

    async function handleChange(e) {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.patch(
                "http://localhost:5000/manager/users/modify",
                user,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            if (res.data.check === true) {
                setShowAlertSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []); // [] Indica che l'effetto viene eseguito una sola volta

    return (
        <Container className="mt-5">
            {showAlertSuccess && (
                <Alert key="success" variant="success">
                    Account information changed successfully. Confirmation has
                    been sent by email
                </Alert>
            )}
            <h2>Profilo Utente</h2>
            <Form onSubmit={handleSubmit} autoComplete="off" method="POST">
                <Form.Group controlId="firstName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        name="surname"
                        placeholder="Enter surname"
                        value={user.surname}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        // value={user.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="telNumber">
                    <Form.Label>Telephone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        name="tel_number"
                        placeholder="Enter telephone number"
                        value={user.tel_number}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button
                    className="mt-3"
                    variant="primary"
                    type="submit"
                >
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}
