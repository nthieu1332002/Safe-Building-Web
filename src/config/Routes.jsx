import React from 'react'
import { MdDashboard, MdRoomService } from "react-icons/md";
import { FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { IoNewspaperSharp } from "react-icons/io5";

const Routes = [
    {
        path: "/",
        name: "Dashboard",
        icon: <MdDashboard/>,
    },
    {
        path: "/building",
        name: "Building",
        icon: <FaBuilding />,
    },
    {
        path: "/admin",
        name: "Admin",
        icon: <FaUserAlt/>,
    },
    {
        path: "/resident",
        name: "Resident",
        icon: <BsFillPeopleFill/>,
    },
    {
        path: "/flat",
        name: "Flat",
        icon: <HiHome/>,
    },
    {
        path: "/service",
        name: "Service",
        icon: <MdRoomService/>,
    },
    {
        path: "/contract",
        name: "Contract",
        icon: <IoNewspaperSharp/>,
    },
]

export default Routes