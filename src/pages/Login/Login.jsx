import React from "react";
import loginImg from "../../assets/images/LoginImage.jpg";
import logo from "../../assets/images/brand-y.png";
import { FcGoogle } from "react-icons/fc";
import * as Ant from "antd";
import "./style.scss";

const Login = () => {
  return (
    <>
      <div class=" main-container row">
        <div class="login-img">
          <img src={loginImg} alt="login-img" />
        </div>
        <div class="login-field">
          <div class="logo">
            <img src={logo} alt="logo" />
          </div>

          <p className="sign-in-title">Sign In</p>

          <Ant.Input placeholder="Email" id="txt-email" />

          <Ant.Input
            placeholder="Password"
            type={"password"}
            id="txt-password"
          />
          <div style={{ width: "60%" }}>
            <a href="#">Forgot Password</a>
          </div>
          <Ant.Button type="primary" id="login-button">
            SIGN IN
          </Ant.Button>
          <span id="alternative-signin">Or sign in with</span>
          <Ant.Button type="default" id="google-button">
            <FcGoogle />
            Google
          </Ant.Button>
        </div>
      </div>
    </>
  );
};

export default Login;
