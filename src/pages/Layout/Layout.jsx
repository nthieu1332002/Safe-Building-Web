import React from "react";
import { Outlet } from "react-router-dom";
import SideBarMenu from "../../components/SideBarMenu/SideBarMenu";
import "./style.scss";

const Layout = () => {
  return (
    <div className="main-container">
      <div className="side-bar">
        <SideBarMenu />
      </div>
      <div className="main-content">
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
