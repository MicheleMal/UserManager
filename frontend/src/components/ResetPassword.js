import axios from "axios";
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resetStatus, setResetStatus] = useState({
        message: "",
        status: "",
    });

    // Step 1
    async function handleSubmitEmail(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:5000/auth/reset-password-request",
                {
                    email: email,
                }
            );

            if (data.check === true) {
                setStep(2);
                setResetStatus({
                    message: data.message,
                    status: "success",
                });
            }
        } catch (error) {
            if (error.response.status === 404) {
                setResetStatus({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    }

    // Step 2
    async function handleSubmitNewPassword(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:5000/auth/reset-password",
                {
                    otp: otp,
                    password: newPassword
                }
            );

            if (data.check === true) {
                navigate("/authentication")
            }
        } catch (error) {
            if (error.response.status === 404) {
                setResetStatus({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    }

    return (
        <Container className="mt-5">
            {resetStatus.message && (
                <Alert variant={resetStatus.status} className="mt-3">
                    {resetStatus.message}
                </Alert>
            )}

            {/* STEP 1 */}
            {step === 1 && (
                <div>
                    <h2>Step 1: Inserisci l'Email</h2>
                    <Form onSubmit={handleSubmitEmail}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Invia OTP
                        </Button>
                    </Form>
                </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <div>
                    <h2>Step 2: Inserisci il Codice OTP e la nuova password</h2>
                    <Form onSubmit={handleSubmitNewPassword}>
                        <Form.Group controlId="otp">
                            <Form.Label>Codice OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci il codice OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="newPassword">
                            <Form.Label className="mt-4">Nuova Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Inserisci la nuova password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Reimposta Password
                        </Button>
                    </Form>
                </div>
            )}
        </Container>
    );
}
