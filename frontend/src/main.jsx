import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { Signin } from './pages/auth/Signin.jsx'
import { Signup } from './pages/auth/Signup.jsx'
import { Profile } from './pages/Profile.jsx'
import { ConfirmAccount } from './pages/auth/ConfirmAccount.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/signin",
    element: <Signin/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/auth/confirm/:tokenConfirmation",
    element: <ConfirmAccount/>
  },
  {
    //? Aggiungere pagina reset password
    path: "/reset-password",
    element: <Profile/>
  }  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
