import { Outlet, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'

const PrivateRoutes = () => {
    let auth = Cookies.get("token")
    return (auth ? <Outlet /> : <Navigate to="/login" />)
}


export default PrivateRoutes;