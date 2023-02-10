import React from "react";
import loginImg from "../../assets/images/LoginImage.jpg";
import logo from "../../assets/images/brand-y.png";
import { FcGoogle } from "react-icons/fc";
import * as Ant from "antd";
import "./style.scss";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../store/user/UserSlice.js";

const Login = () => {
  const dispatch = useDispatch();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("data", data);
        dispatch(
          loginWithGoogle({ email: data.email, isVerified: data.isVerified })
        );
        // setValue(data.user.email)
        // localStorage.setItem("email",data.user.email)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="login-field">
        <div className="logo">
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
        <Ant.Button
          block
          type="default"
          className="google-button"
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Ant.Button>
      </div>
    </>
  );
};

export default Login;
