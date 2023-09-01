import { Container, Nav, Navbar } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

export default function NavbarComponent() {
    const [cookies] = useCookies(["jwtToken"]);
    const jwtToken = cookies.jwtToken;

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">
                    User Manager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                    </Nav>

                    {jwtToken ? (
                        <Nav className='"ml-auto'>
                            <Nav.Link as={NavLink} to="/dashboard">
                                Dashboard
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className='"ml-auto'>
                            <Nav.Link as={NavLink} to="/login">
                                Login
                            </Nav.Link>
                        </Nav>
                    )}

                    {/* <Nav className='"ml-auto'>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
