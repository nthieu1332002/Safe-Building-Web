import React from "react";
import loginImg from "../../assets/images/LoginImage.jpg";
import logo from "../../assets/images/brand-y.png";
import { FcGoogle } from "react-icons/fc";
import * as Ant from "antd";
import "./style.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div class="main-container">
        <div class="login-img">
          <img src={loginImg} alt="login-img" />
        </div>
        <div class="login-field">
          <div class="logo">
            <img src={logo} alt="logo" />
          </div>

          <p className="sign-in-title">Sign In</p>

          <Ant.Input placeholder="Email" className="email" />

          <Ant.Input
            placeholder="Password"
            type={"password"}
            className="password"
          />
          <div className="forgot-password">
            <Link to="#">Forgot Password</Link>
          </div>
          <Ant.Button block type="primary" className="login-button">
            SIGN IN
          </Ant.Button>
          <span id="alternative-signin">Or</span>
          <Ant.Button block type="default" className="google-button">
            <FcGoogle size={20}/>
            Sign in with Google
          </Ant.Button>
        </div>
      </div>
    </>
  );
};

export default Login;
