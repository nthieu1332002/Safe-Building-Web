import { Outlet, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'
import { toast } from "react-toastify"
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const user = useSelector((state) => state.user);

    if (!user.userToken)  {
        toast.error("You do not have permission to access this.")
    }
    return (user.userToken ? <Outlet /> : <Navigate to="/login" />)
}


export default PrivateRoutes;