import { Outlet, Navigate, redirect } from "react-router-dom"
import Cookies from 'js-cookie'

const ProtectedRoutes = () => {
    let auth = Cookies.get("token")
    if (auth !== undefined)  {
        // toast.error("You cannot access this.")
    }
    return (!auth ? <Outlet /> : <Navigate to="/chat" />)
}

export default ProtectedRoutes;