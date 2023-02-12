import { Outlet, Navigate, redirect } from "react-router-dom"
import Cookies from 'js-cookie'
import { useSelector } from "react-redux"

const ProtectedRoutes = () => {
    const user = useSelector((state) => state.user);

    return (!user.userToken ? <Outlet /> : <Navigate to="/" />)
}

export default ProtectedRoutes;