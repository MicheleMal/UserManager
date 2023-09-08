import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState({
        message: "",
        status: "",
    });
    const { tokenConfirmation } = useParams();
    // const [confirmed, setConfirmed] = useState(false);

    async function controllConfirm() {
        try {
            const res = await axios.get(
                `http://localhost:5000/auth/confirm/${tokenConfirmation}`
            );

            if (res.data.check === true) {
                navigate("/authentication");
                // setConfirmed(true);
                // setShowInfo({
                //     message: res.data.message,
                //     status: "success",
                // });
            }
        } catch (error) {
            setShowInfo({
                message: error.response.data.message,
                status: "danger",
            });
        }
    }

    useEffect(() => {
        controllConfirm(); // Richiama la funzione solo se il flag è false
    }, []); // Osserva il flag come dipendenza

    return (
        <Container className="mt-5">
            {showInfo.message && (
                <Alert variant={showInfo.status}>{showInfo.message}</Alert>
            )}
        </Container>
    );
}
