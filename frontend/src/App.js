import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import AuthenticationPage from "./components/AuthenticationPage";
import ConfirmationPage from "./components/ConfirmationPage";
import ResetPassword from "./components/ResetPassword";

function App() {
    return (
        <Router>
            <NavbarComponent />

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/authentication" element={<AuthenticationPage/>} />
                <Route
                    path="/auth/confirm/:tokenConfirmation"
                    element={<ConfirmationPage/>}
                />
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>

                {/* <Route path="*" Component={NotFound} /> TODO: Aggiungere pagina 404*/}
            </Routes>
        </Router>
    );
}

export default App;
