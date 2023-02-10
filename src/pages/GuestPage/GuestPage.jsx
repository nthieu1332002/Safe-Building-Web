import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/LoginImage.jpg";
import "./style.scss";

const GuestPage = () => {
  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <>
      <div className="main-container">
        
          <div className="login-img">
            <img src={loginImg} alt="login-img" />
          </div>
        
        <div className="content">
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default GuestPage;
