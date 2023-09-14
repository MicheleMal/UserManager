import { Container, Row, Col } from "react-bootstrap";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

export default function AuthenticationPage() {
    return (
        <Container>
            <Row className="justify-content-center">
                {/* Login */}
                <Col md={6}>
                    <FormLogin />
                </Col>

                {/* Register */}
                <Col md={6}>
                    <FormRegister />
                </Col>
            </Row>
        </Container>
    );
}
