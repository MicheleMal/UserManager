// import axios from "axios"
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Dashboard() {
    const [cookies] = useCookies(["jwtToken"]);
    const jwtToken = cookies.jwtToken;

    const [user, setUser] = useState([]);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);

    async function fetchData() {
        try {
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
                setShowAlertSuccess(true)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []); // [] Indica che l'effetto viene eseguito una sola volta

    return (
        <>
            <h1>Benvenuto {user.name}</h1>

            <h3>Modifica informazioni</h3>
            <Form method="POST" autoComplete="off">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter surname"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* TODO: Aggiungere modifica passowrd */}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telephone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter telephone number"
                        name="tel_number"
                        value={user.tel_number}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Modify
                </Button>
            </Form>

            {showAlertSuccess && (
                <Alert key="success" variant="success">
                    Account information changed successfully. Confirmation has
                    been sent by email
                </Alert>
            )}
        </>
    );
}
