import { Outlet, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'

import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const user = useSelector((state) => state.user);
    return (user.userToken ? <Outlet /> : <Navigate to="/login" />)
}


export default PrivateRoutes;