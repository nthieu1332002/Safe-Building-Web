import { Outlet, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'

const PrivateRoutes = () => {
    let auth = Cookies.get("token")
    if (auth === undefined)  {
        // toast.error("You do not have permission to access this.")
    }
    return (auth ? <Outlet /> : <Navigate to="/login" />)
}


export default PrivateRoutes;