import React, { useEffect } from "react";

import logo from "../../assets/images/brand-y.png";
import { FcGoogle } from "react-icons/fc";
import { Button, Form, Input } from "antd";
import "./style.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../../store/user/userSlice";
import { toast } from "react-toastify";
import { auth, provider } from "../../firebase-messaging-sw";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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

  const onFinish = (values) => {
    dispatch(login(values.email, values.password));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-field">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <p className="sign-in-title">Sign In</p>
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Email is required.",
              },
            ]}
          >
            <Input placeholder="Email" className="custom-input"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required.",
              },
            ]}
          >
            <Input placeholder="Password" type="password" className="custom-input"/>
          </Form.Item>
          <div className="forgot-password">
            <Link to="/forgot-password" id="link">
              Forgot Password
            </Link>
          </div>
          <Form.Item>

              <Button
                block
                type="primary"
                className="login-button"
                htmlType="submit"
                loading={user.loading}
              >
                SIGN IN
              </Button>

          </Form.Item>
        </Form>
        <span id="alternative-signin">Or</span>
        <Button
          block
          type="default"
          className="google-button"
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default Login;
