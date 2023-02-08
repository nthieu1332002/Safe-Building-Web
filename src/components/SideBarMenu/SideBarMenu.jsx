import React from "react";
import { NavLink } from "react-router-dom";
import Routes from "../../config/Routes";
import brand from "../../assets/images/brand-x.png";
import "./style.scss";

const SideBarMenu = () => {
  return (
    <div className="nav-bar">
      <div className="brand-container">
        <img src={brand} alt="logo" />
      </div>
      {Routes.map((item, index) => {
        return (
          <NavLink key={index} to={item.path} className="nav-bar__item">
            <div className="nav-bar__item__icon">{item.icon}</div>
            <div className="nav-bar__item__name">{item.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SideBarMenu;
