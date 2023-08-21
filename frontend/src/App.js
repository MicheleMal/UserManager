import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NavbarComponent from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <NavbarComponent/>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />

        {/* <Route path="*" Component={NotFound} /> TODO: Aggiungere pagina 404*/}
      </Routes>
    </Router>
  );
}

export default App;