import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function ConfirmationPage() {
    const { tokenConfirmation } = useParams();

    const [confirmed, setConfirmed] = useState()
    const url = `http://localhost:5000/auth/confirm/${tokenConfirmation}`;

    async function fetchData(){
        try {
            const {data} = await axios.get(url)

            if(data.check === true){
                setConfirmed(true)
            }
        } catch (error) {
            if(error.response.data.check === false){
                setConfirmed(false)
            }
        }
    }

    const fetchDataCalled = useRef(false)
    useEffect(()=>{
        if(fetchDataCalled.current) return
        fetchDataCalled.current = true
        fetchData()
    }, [])

    return (
        <Container className="mt-5">
            {confirmed ? (
                <div>
                    <Link to="/authentication">
                        <Button variant="success" to="/authentication">Login</Button>
                    </Link>
                    <Alert variant="success" className="mt-3">Account verificato</Alert>
                </div>
            ): (
                <div>
                    <Link to="/authentication">
                        <Button variant="danger" to="/authentication">Login</Button>
                    </Link>
                    <Alert variant="danger" className="mt-3">Account già verificato</Alert>
                </div>
            )
            }
        </Container>
    );
}
