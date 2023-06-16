//TODO: Inserire logout e rimozione cookie, inoltre inserire informazioni sul profilo

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard.';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/signup' Component={Register}/>
        <Route path='/login' Component={Login} />
        {/* <Route path='/dashboard' Component={Dashboard} /> */}
      </Routes>
    </Router>
  );
}

export default App;
