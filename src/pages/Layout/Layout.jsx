import React from "react";
import { Outlet } from "react-router-dom";
import SideBarMenu from "../../components/SideBarMenu/SideBarMenu";
import { HiOutlineLogout } from "react-icons/hi";
import brand from "../../assets/images/brand-x.png";
import "./style.scss";

const Layout = () => {
  return (
    <div className="main-container">
      <div className="side-bar">
        <div className="brand-container">
          <img src={brand} alt="logo" />
        </div>
        <SideBarMenu />
        <div className="logout-container">
          <div className="icon">
            <HiOutlineLogout />
          </div>
          Logout
        </div>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
